import sys

import pymongo

sys.path.append("/libs")

from datetime import timedelta

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from car_cutter_api import CarCutter

from car_cutter_helper import generate_sha1_hash

from helper import get_current_datetime

import time

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()

        self.status_check_interval = 60
    
    def main(self):
        print(f'car cutter status checker is running...')
        while True:
            x_seconds_ago = get_current_datetime() - timedelta(seconds=self.status_check_interval)
            
            img_where = {
                "car_cutter_classified":True,
                "car_cutter_ready":False,
                "status":"active",
                "status_check_count":{
                    "$lt":20000
                },
                "status_checked_at":{
                    "$lt":x_seconds_ago
                },
            }
            
            images = [i["url"] for i in list(self.mongodb.images_collection.find(img_where).sort("updated_at",pymongo.ASCENDING).limit(30))]
            
            if len(images) > 0:
                submit_res = self.car_cutter.check_status(images)
                
                for item in submit_res["data"]["images"]:
                    
                    url = item["image"]
                    id = generate_sha1_hash(url)
                    
                    if item["quality"] != 'ok' or item["status"] in ['undefined','error']:
                        
                        self.mongodb.images_collection.update_one(
                            {"_id":id},
                            {"$set":{
                                "status":"expired",
                                "message":"image quality is bad (car cutter)"
                            }}
                        )
                        
                        continue
                    
                    status = item["status"]
                    
                    phase = item["phase"]
                    
                    img_db_update = {}
                    
                    img_db_update["updated_at"] = get_current_datetime()
                    
                    if status == "raw" and phase == "ready":
                        img_db_update["car_cutter_ready"] = True
                        img_db_update["download_failed_count"] = 0
                        self.mongodb.images_collection.update_one({"_id":id},{"$set":img_db_update})
                    else:
                        self.mongodb.images_collection.update_one({"_id":id},{"$inc":{"status_check_count":1}})
            else:
                time.sleep(10)                  

if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

