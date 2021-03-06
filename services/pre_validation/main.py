import os
import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from validation import MarketCheckValidation

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.pulsar_manager = PulsarManager()
        
        self.consumer = self.pulsar_manager.create_consumer(self.pulsar_manager.topics.LISTING_PRE_VALIDATION)
        
        self.producer = self.pulsar_manager.create_producer(self.pulsar_manager.topics.LISTING_PREDICT_MAKE_MODEL)
        
        self.mc_validation = MarketCheckValidation()
        
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
                
                status,error = self.mc_validation.validate(data)
                
                if status == False:
                    
                    event_data = {
                        "listing_id":listing_id,
                        "message":error["error_message"],
                        "website_id":website_id
                    }
                    
                    print(f'listing rejected : {error["error_message"]}')
                    
                    self.mongodb.insert_event(self.mongodb.listing_event_collection,event_data)
                    
                    # handle manual pipeline
                    if self.pulsar_manager.PIPELINE == "manual":
                        
                        self.mongodb.recent_listings_collection.update_one({"listing_id":listing_id},{
                            "$set":{
                                "message":error["error_message"],
                                "status":"expired"
                            }
                        })
                    
                    continue
                
                # handle manual pipeline
                if self.pulsar_manager.PIPELINE == "manual":
                    
                    self.mongodb.recent_listings_collection.update_one({"listing_id":listing_id},{
                        "$set":{
                            "message":"pre-validation conditions : PASSED"
                        }
                    })
                
            self.producer.produce_message(message)
            
        
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

