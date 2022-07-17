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
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()
        
        self.mysqldb = MysqlDatabase()
    
    
    def main(self):
        print("listening for new messages")
        while True:
            
            message =  self.consumer.consume_message()
            
            website_id = message["website_id"]
            
            listing_id = message["listing_id"]
            
            where = {"_id":listing_id}
            
            data = message.get("data",None)
            
            if data == None:
                data = self.mongodb.listings_collection.find_one(where)
            
            if data == None:
                # add code to report this incident
                continue
            
            
            if website_id == 17:
                pass
            
            if website_id == 18:
                
                img_where = {
                    "listing_id":listing_id,
                    "is_car":True,
                    "car_cutter_classified":False,
                    "status":"active"
                }
                
                images = [i["url"] for i in list(self.mongodb.images_collection.find(img_where))]
                print(f'total images :{len(images)}')
                if len(images) > 0:
                    cc_total_images,processed_images = self.car_cutter.submit_images(images)
                    
                    if len(processed_images) == 0:
                        self.mysqldb.connect()
                        self.mysqldb.recUpdate("fl_listings",{"Status":"expired","why":"car cutter returned zero image in submit endpoint"},{"ID":data["mysql_listing_id"]})
                        self.mysqldb.disconnect()
                        self.mongodb.images_collection.delete_many({"listing_id":listing_id})
                        continue                    
                    
                    for item in processed_images:
                        print(item)
                        item["data"]["status_check_count"] = 0
                        item["data"]["status_checked_at"] = get_current_datetime()
                        item["data"]["image_generated"] = False 
                        self.mongodb.images_collection.update_one({"_id":item["_id"]},{
                            "$set":item["data"]
                        })
                    
                    self.mongodb.listings_collection.update_one({"_id":listing_id},{"$set":{
                        "cc_total_img":cc_total_images
                    }})
                    
                    self.mongodb.images_collection.update_many({"listing_id":listing_id,"car_cutter_classified":False},{
                        "$set":{
                            "status":"expired",
                            "message":"car cutter did not process it."
                        }
                    })


if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

