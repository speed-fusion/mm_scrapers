import sys

sys.path.append("/libs")

from mongo_database import MongoDatabase

from car_cutter_api import CarCutter

from pulsar_manager import PulsarManager

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.CAR_CUTTER_DOWNLOADER)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.GENERATE_IMAGE)
        
    def main(self):
        while True:
            
            message =  self.consumer.consume_message()
            
            continue
            
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
                
                downloaded_images = self.car_cutter.download_multiple_images(images)
                
                message["data"]["images"] = downloaded_images
                
                self.producer.produce_message(message)
                

if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

