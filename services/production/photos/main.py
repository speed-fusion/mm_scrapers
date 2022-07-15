import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager
import pymongo
from mongo_database import MongoDatabase
from mysql_database import MysqlDatabase
import time
class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.FL_LISTING_PHOTOS_INSERT)
        
        self.mongodb = MongoDatabase()
        
        self.mysqldb = MysqlDatabase()
    
    
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
                if not "mysql_listing_id" in data:
                    continue
                
                mysql_listing_id = data["mysql_listing_id"]
                
                images = list(self.mongodb.images_collection.find({"listing_id":listing_id,"is_car_image":True,"image_ready":1}).sort("position",pymongo.ASCENDING))
                
                if len(images) == 0:
                    continue
                
                thumb_image_path = images[0]["thumb"]["path"]
                
                mm_url = data["mm_url"]
                
                self.mysqldb.connect()
                
                self.mysqldb.recCustomQuery(f'UPDATE fl_listings SET Main_photo="{thumb_image_path}",car_cutter={data["cc_status"]},cc_total_img={data["cc_total_img"]},Status="active",mm_product_url="{mm_url}" WHERE ID={mysql_listing_id} AND Status NOT IN("manual_expire","pending","sold")')
                
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
                    
                    
                    try:
                        
                        self.mysqldb.recDelete("fl_listing_photos",{"Listing_ID":mysql_listing_id,"old_image":1})
                        # time.sleep(2)
                        id = self.mysqldb.recInsert("fl_listing_photos",tmp)
                        
                        self.mongodb.images_collection.update_one({"_id":item["_id"]},{
                            "$set":{
                                "mysql_photo_id":id
                            }
                        })
                        
                    except Exception as e:
                        print(f'error : {str(e)}')
                
                self.mysqldb.disconnect()
        
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

