from cmath import phase
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
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.CAR_CUTTER_STATUS_CHECK)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.CAR_CUTTER_DOWNLOADER)
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()

        self.status_check_interval = 60
        
        self.status_check_timeout = 15
    
    def main(self):
        print(f'car cutter status checker is running...')
        while True:
            
            message =  self.consumer.consume_message()
            
            website_id = message["website_id"]
            
            listing_id = message["listing_id"]
            
            where = {"_id":listing_id}

            data = self.mongodb.listings_collection.find_one(where)
            
            if data == None:
                continue
            
            
            if website_id == 17:
                pass
            
            if website_id == 18:
                images = message["data"]["images"]
                
                for count in range(0,self.status_check_timeout):
                    for index,item in enumerate(images):
                        if item["car_cutter_ready"] == False:
                            url = item["mm_img_url"]
                            response = self.car_cutter.submit_images([url])
                            status = response["status"]
                            quality = response["quality"]
                            
                            if quality != 'ok' or status in ['undefined','error']:
                                images.pop(index)
                                continue
                            
                            if status == "raw" and phase == "ready":
                                item["car_cutter_ready"] = True
                    
                    total_pending = 0
                    
                    for item in images:
                        if item["car_cutter_ready"] == False:
                            total_pending += 1
                    
                    if total_pending != 0:
                        print(f'sleeping for next {self.status_check_interval} seconds...')
                        time.sleep(self.status_check_interval)
                        continue
                    break
                
                for index,item in images:
                    if item["car_cutter_ready"] == False:
                        images.pop(index)
                
                print(f'all images ready to download...')
                
                message["data"]["images"] = images
                
                self.producer.produce_message(message)
                

if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

