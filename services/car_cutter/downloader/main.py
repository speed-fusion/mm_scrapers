import sys

sys.path.append("/libs")

from mongo_database import MongoDatabase

from car_cutter_api import CarCutter

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        self.mongodb = MongoDatabase()
        
        self.car_cutter = CarCutter()
        
    def main(self):
        print(f'car cutter image downloader running...')
        while True:
            
            img_where = {
                "car_cutter_ready":True,
                "car_cutter_downloaded":None,
                "status":"active",
                "download_failed_count":{
                    "$lt":30
                }
            }
            
            images = list(self.mongodb.images_collection.find(img_where))
            
            if len(images) > 0:
                downloaded_images = self.car_cutter.download_multiple_images(images)
                
                for item in downloaded_images:
                    
                    self.mongodb.images_collection.update_one(item["where"],{
                        "$set":item["what"]
                    })

if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

