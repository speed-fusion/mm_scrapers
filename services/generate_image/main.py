import sys
from unittest import result

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from mysql_database import MysqlDatabase

from car_cutter_api import CarCutter

from image_generator import ImageGenerator
class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.pulsar_manager = PulsarManager()
        
        self.consumer = self.pulsar_manager.create_consumer(self.pulsar_manager.topics.GENERATE_IMAGE)
        
        self.producer = self.pulsar_manager.create_producer(self.pulsar_manager.topics.FL_LISTING_PHOTOS_INSERT)
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()
        
        self.mysqldb = MysqlDatabase()
        
        self.image_generator = ImageGenerator()
    
    def delete_mysql_listing(self,listing_id):
        self.mysqldb.connect()
        self.mysqldb.recDelete("fl_listings",{"ID":listing_id})
        self.mysqldb.disconnect()
        
        self.mongodb.listings_collection.update_one({"mysql_listing_id":listing_id},{"$set":{"status":"expired"}})
    
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
                mysql_listing_id = data["mysql_listing_id"]
                
                images = message["data"]["images"]
                
                result = self.image_generator.processListing(images,website_id,mysql_listing_id)
                
                all_images = []
                
                for img in result:
                    if img["status"] == False:
                        print(f'image generation failed : {img}')
                        continue
                    
                    all_images.append(img)
                
                message["data"]["images"] = all_images
                
                if self.pulsar_manager.PIPELINE == "manual":
                    self.mongodb.recent_listings_collection.update_one({"listing_id":listing_id},{
                        "$set":{
                            "message":f'images generated.',
                            "status":"active"
                        }
                    })

            self.producer.produce_message(message)
            
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

