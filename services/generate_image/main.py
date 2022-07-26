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
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.GENERATE_IMAGE)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.FL_LISTING_PHOTOS_INSERT)
        
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
                
                if len(images) < 2:
                    self.delete_mysql_listing(mysql_listing_id)
                    continue
                
                result = self.image_generator.processListing(images,website_id,mysql_listing_id)
                
                all_images = []
                
                for img in result:
                    if img["status"] == False:
                        print(f'image generation failed : {img}')
                        continue
                    
                    all_images.append(img)
                
                if len(images) < 2:
                    self.delete_mysql_listing(mysql_listing_id)
                    continue
                
                message["data"]["images"] = all_images

            self.producer.produce_message(message)
            
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

