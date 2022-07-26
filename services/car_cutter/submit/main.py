import sys
from unittest import result

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from mysql_database import MysqlDatabase

from car_cutter_api import CarCutter

from helper import get_current_datetime

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.CAR_CUTTER_SUBMIT)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.CAR_CUTTER_STATUS_CHECK)
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()
        
        self.mysqldb = MysqlDatabase()
    
    def delete_mysql_listing(self,listing_id):
        self.mysqldb.connect()
        self.mysqldb.recDelete("fl_listings",{"ID":listing_id})
        self.mysqldb.disconnect()
        
        self.mongodb.listings_collection.update_one({"mysql_listing_id":listing_id},{"$set":{"status":"expired"}})
    
    def insert_image_logs(self,image_logs,mysql_listing_id,mongo_listing_id):
        now = get_current_datetime()
        print(image_logs)
        current_month_collection = self.mongodb.car_cutter_logs[f'{now.month}-{now.year}']
        for img in image_logs:
            img["created_at"] = now
            img["mysql_listing_id"] = mysql_listing_id
            img["mongo_listing_id"] = mongo_listing_id
            current_month_collection.insert_one(img)
    
    def main(self):
        print("listening for new messages")
        while True:
            
            message =  self.consumer.consume_message()
            
            # continue
            
            website_id = message["website_id"]
            
            listing_id = message["listing_id"]
            
            where = {"_id":listing_id}
            
            # data = message.get("data",None)
            data = self.mongodb.listings_collection.find_one(where)
            
            if data == None:
                # add code to report this incident
                continue
            
            
            if website_id == 17:
                pass
            
            if website_id == 18:
                final_images = []
                
                mysql_listing_id = data["mysql_listing_id"]
                
                images = message["data"]["images"]
                
                image_by_id = {}
                
                for img in images:
                    image_by_id[img["id"]] = img
                
                print(f'total images :{len(images)}')
                
                if len(images) <= 2:
                    self.delete_mysql_listing(mysql_listing_id)
                    continue
                
                submit_images = [i["mm_img_url"] for i in images]
                cc_total_images,processed_images,image_logs,all_angles_count = self.car_cutter.submit_images(submit_images)
                for item in image_logs:
                    img_item = image_by_id[item["id"]]
                    item["source_url"] = img_item["source_url"]
                    
                self.insert_image_logs(image_logs,mysql_listing_id,listing_id)
                
                self.mongodb.listings_collection.update_one(where,{
                    "$set":{
                        "cc_unique_img_count":cc_total_images,
                        "cc_all_img_count":all_angles_count
                    }
                })
                
                for item in processed_images:
                    img_item = image_by_id[item["id"]]
                    img_item.update(item)
                    final_images.append(img_item)
                
                message["data"]["images"] = final_images
                
                self.producer.produce_message(message)

if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

