import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.pulsar_manager = PulsarManager()
        
        self.consumer = self.pulsar_manager.create_consumer(self.pulsar_manager.topics.LISTING_POST_VALIDATION)
        
        self.producer = self.pulsar_manager.create_producer(self.pulsar_manager.topics.LISTING_PREDICT_NUMBERPLATE)
        
        self.mongodb = MongoDatabase()
    
    
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
                
                image_count = self.mongodb.images_collection.count_documents({"listing_id":listing_id,"is_car_image":True})
                
                if image_count == 0:
                    print(f'listing rejected , image count is 0')
                    
                    what = {
                        "listing_id":listing_id,
                        "message":f'zero car images'
                        
                    }
                    
                    # handle manual pipeline
                    if self.pulsar_manager.PIPELINE == "manual":
                        
                        self.mongodb.recent_listings_collection.update_one({"listing_id":listing_id},{
                            "$set":{
                                "message":"pre-validation conditions : FAILED (zero images)",
                                "status":"expired"
                            }
                        })
                    
                    self.mongodb.insert_event(self.mongodb.listing_event_collection,what)
                    continue
                
                # handle manual pipeline
                if self.pulsar_manager.PIPELINE == "manual":
                    
                    self.mongodb.recent_listings_collection.update_one({"listing_id":listing_id},{
                        "$set":{
                            "message":"post-validation conditions : PASSED"
                        }
                    })
                
                self.mongodb.listings_collection.update_one(where,{"$set":{
                    "total_photos": image_count
                }})
                
            self.producer.produce_message(message)


if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

