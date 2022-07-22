import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase

from helper import generate_sha1

from pathlib import Path

from image_downloader import ImageDownloader

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.DOWNLOAD_IMAGE)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.CAR_CUTTER_SUBMIT)
        
        self.mongodb = MongoDatabase()

        self.media_dir = Path("/media")
        
        self.files_dir = Path("/files")
        
        self.image_downloader = ImageDownloader()
        
        self.image_domain_base_url = "https://media.motor.market"
        
        
    def main(self):
        print("listening for new messages")
        while True:
            
            message =  self.consumer.consume_message()
            
            website_id = message["website_id"]
            
            listing_id = message["listing_id"]
            
            where = {"_id":listing_id}
            
            data = self.mongodb.listings_collection.find_one(where)
            
            mysql_listing_id = data["mysql_listing_id"]
            
            website_dir = self.files_dir.joinpath(f'S{website_id}')
            
            if not website_dir.exists():
                website_dir.mkdir()
            
            listing_dir = website_dir.joinpath(f'ad{mysql_listing_id}')
            
            if not listing_dir.exists():
                listing_dir.mkdir()
            
            if data == None:
                # add code to report this incident
                continue
            
            if website_id == 17:
                pass
            
            if website_id == 18:
                
                # download images
                
                images = message["data"]["images"][0:30]
                
                for item in images:
                    url = item["url"]
                    id = generate_sha1(url)
                    path = listing_dir.joinpath(f'org_{id}.jpg')
                    item["mm_img_url"] = f'{self.image_domain_base_url}{str(path)}'
                    item["id"] = id
                    item["path"] = path
                    item["source_url"] = url
                
                downloaded_images = []
                
                for item in self.image_downloader.download_multiple_images(images):
                    item["path"] = str(item["path"])
                    downloaded_images.append(item)
                    # try:
                    #     item["listing_id"] = listing_id
                    #     item["website_id"] = website_id
                    #     item["car_cutter_classified"] = False
                    #     item["car_cutter_ready"] = False
                    #     item["car_cutter_downloaded"] = False
                        
                    #     self.mongodb.images_collection.insert_one(item)
                        
                    # except Exception as e:
                    #     print(f'error : {str(e)}')
                
                message["data"]["images"] = downloaded_images
                
                self.producer.produce_message(message)
            
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

