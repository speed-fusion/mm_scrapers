import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from image_classifier import ImageClassifier

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.CLASSIFY_IMAGE)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.CAR_CUTTER_SUBMIT)
        
        self.mongodb = MongoDatabase()
        
        self.image_classifier = ImageClassifier()
    
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
                
                where = {
                    "listing_id":listing_id,
                    "image_classify":None,
                    "status":"active"
                }
                
                pending_images = list(self.mongodb.images_collection.find(where))
                
                max_images = 20
                
                total_images = 0
                for item in pending_images:
                    image_where = {"_id":item["_id"]}
                    if total_images >= max_images:
                        self.mongodb.images_collection.update_one(image_where,{
                            "$set":{
                                "status":"expired",
                                "message":"max image limit reached."
                            }
                        })
                        
                        continue
                    
                    image_update = {}
                    # is_car = self.image_classifier.is_car_image(item["path"])
                    is_car = True
                    image_update["is_car"] = is_car
                    image_update["image_classify"] = True
                    if is_car == False:
                        image_update["status"] = "expired"
                    else:
                        total_images += 1
                    
                    self.mongodb.images_collection.update_one(image_where,{
                        "$set":image_update
                    })
            
            self.producer.produce_message(message)
            
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

