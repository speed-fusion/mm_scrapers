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
    
    
    def main(self):
        print("listening for new messages")
        while True:
            
            message =  self.consumer.consume_message()
            
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
                
                if len(images) == 0:
                    self.delete_mysql_listing(mysql_listing_id)
                    continue
                
                submit_images = [i["mm_img_url"] for i in images]
                cc_total_images,processed_images = self.car_cutter.submit_images(submit_images)
                
                self.mongodb.listings_collection.update_one(where,{
                    "$set":{
                        "cc_total_img":cc_total_images
                    }
                })
                
                if len(processed_images) == 0:
                    self.delete_mysql_listing(mysql_listing_id)
                    continue
                
                for item in processed_images:
                    img_item = image_by_id[item["id"]]
                    img_item.update(item)
                    final_images.append(img_item)
                
                message["data"]["images"] = final_images
                
                self.producer.produce_message(message)

if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

