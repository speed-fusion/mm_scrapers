import sys
from unittest import result

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from mysql_database import MysqlDatabase

from car_cutter_api import CarCutter

from helper import get_current_datetime

from spyne_ai import SpyneAi

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.SPYNE_AI)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.DOWNLOAD_IMAGE)
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()
        
        self.mysqldb = MysqlDatabase()
        
        self.spyne_ai = SpyneAi()
    
    
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
                images = data.get("images",[])
                
                all_images = []
                
                exterior = []
                
                interior = []
                
                for img in images:
                    classification = self.spyne_ai.classify_image(img["url"])
                    
                    if classification["image_class"] == "Interior" and classification["image_class_confidence"] > 80:
                        img["download_url"] = img["url"]
                        img["status"] = True
                        interior.append(img)
                    elif classification["image_class"] == "Exterior" and classification["image_class_confidence"] > 80:
                        exterior.append(img["url"])
                    else:
                        print(f'unknown class : {classification}')
                    
                    if len(exterior) > 5 and len(interior) > 5:
                        break
                
                result_urls = self.spyne_ai.remove_background(exterior,listing_id)
                
                index = 0
                
                for img in result_urls:
                    img["position"] = index
                    all_images.append(img)
                    index +=1
                
                for img in interior:
                    img["position"] = index
                    all_images.append(img)
                    index += 1
                
                message["data"]["images"] = all_images

            self.producer.produce_message(message)
            break
            
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

