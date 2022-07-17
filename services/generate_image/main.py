import sys

sys.path.append("/libs")

from mongo_database import MongoDatabase

from image_generator import ImageGenerator

from pulsar_manager import PulsarManager

import time

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.mongodb = MongoDatabase()
        
        self.image_generator = ImageGenerator()
        
        pulsar_manager = PulsarManager()
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.FL_LISTING_PHOTOS_INSERT)
    
    def main(self):
        print("listening for new messages")
        for i in range(0,5):
            
            
            all_listings = list(self.mongodb.images_collection.distinct("listing_id"))
            print(all_listings)
            for listing_id in all_listings:
                
                active_count = self.mongodb.images_collection.count_documents({"status":"active","listing_id":listing_id})
                image_downloaded_count = self.mongodb.images_collection.count_documents({"status":"active","listing_id":listing_id,"car_cutter_downloaded":True})
                
                if active_count != image_downloaded_count:
                    print(f'skipping : {listing_id} , active_count : {active_count} , image_downloaded_count : {image_downloaded_count}')
                    continue
                
                if active_count == 0 and image_downloaded_count == 0:
                    time.sleep(5)
                    continue
                
                data = self.mongodb.listings_collection.find_one({"_id":listing_id})
                
                website_id = data["website_id"]
                mysql_listing_id = data["mysql_listing_id"]
                
                images = list(self.mongodb.images_collection.find({
                    "car_cutter_downloaded":True,
                    "image_generated":False,
                    "status":"active"
                }))

                if len(images) == 0:
                    continue
                
                result = self.image_generator.processListing(images,website_id,mysql_listing_id)
                
                for item in result:
                    
                    tmp = {}
                    tmp["org"] = item["org"]
                    tmp["large"] = item["large"]
                    tmp["thumb"] = item["thumb"]
                    tmp["image_generated"] = item["status"]
                    
                    if item["status"] == False:
                        tmp["status"] ="expired"
                        tmp["message"] = "image generation failed"
                    
                    self.mongodb.images_collection.update_one({"_id":item["id"]},{"$set":tmp})
                
                message = {
                    "listing_id":listing_id,
                    "website_id":website_id,
                    }
                
                self.producer.produce_message(message)


if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()