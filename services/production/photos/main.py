from pathlib import Path
import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager
import pymongo
from mongo_database import MongoDatabase
from mysql_database import MysqlDatabase

from helper import delete_directory

class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.FL_LISTING_PHOTOS_INSERT)
        
        self.mongodb = MongoDatabase()
        
        self.mysqldb = MysqlDatabase()
        
        self.media_dir = Path("/media")
    
    def delete_existing_image_entries(self,listing_id):
        # current_image_entries = self.mysqldb.recCustomQuery(f'SELECT ID FROM fl_listing_photos WHERE Listing_ID={listing_id}')
        # for item in current_image_entries:
        #     self.mysqldb.recDelete("fl_listing_photos",{"ID":item["ID"]})
        self.mysqldb.recDelete("fl_listing_photos",{"Listing_ID":listing_id})
    
    def main(self):
        print("listening for new messages")
        while True:
            
            message =  self.consumer.consume_message()
            
            website_id = message["website_id"]
            
            listing_id = message["listing_id"]
            
            where = {"_id":listing_id}
            
            data = self.mongodb.listings_collection.find_one(where,{"raw":0})
            
            if data == None:
                # add code to report this incident
                continue
            
            
            if website_id == 17:
                pass
            
            
            if website_id == 18:
                
                mysql_listing_id = data["mysql_listing_id"]
                
                images = message["data"]["images"]
                
                images.sort(key=lambda x: x["position"])
                
                if len(images) == 0:
                    # keep it in to_parse so we will know when such event occurs.
                    continue
                
                thumb_image_path = images[0]["thumb"]["path"]
                
                mm_url = data["mm_url"]
                
                self.mysqldb.connect()
                
                self.mysqldb.recCustomQuery(f'UPDATE fl_listings SET Main_photo="{thumb_image_path}",car_cutter=1,Status="active",mm_product_url="{mm_url}" WHERE ID={mysql_listing_id} AND Status NOT IN("manual_expire","pending","sold")')
                
                self.delete_existing_image_entries(mysql_listing_id)
                
                for item in images:
                    tmp = {}
                    
                    tmp["Listing_ID"] = mysql_listing_id
                    
                    tmp["Position"] = item["position"]
                    
                    tmp["Photo"] = item["large"]["path"]
                    
                    tmp["Thumbnail"] = item["thumb"]["path"]
            
                    tmp["Original"] = item["org"]["path"]
                    
                    tmp["Status"] = "active"
                    
                    tmp["Type"] = "picture"
                    
                    tmp["create_ts"] = {"func":"now()"}
                    
                    tmp["delete_banner_flag"] = 0
                    
                    tmp["approved_from_dashboard"] = 1
                    
                    tmp["old_image"] = 0
                    
                    self.mysqldb.recInsert("fl_listing_photos",tmp)
                    
                self.mysqldb.disconnect()
                
                # self.delete_mongo_image_data(listing_id)
                self.delete_images_from_server(website_id,listing_id)
    
    def delete_mongo_image_data(self,id):
        self.mongodb.images_collection.delete_many({
            "listing_id":id
        })
    
    def delete_images_from_server(self,website_id,listing_id):
        website_dir = self.media_dir.joinpath(f'S{website_id}')
        listing_dir = website_dir.joinpath(listing_id)
        delete_directory(listing_dir)
    
    
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

