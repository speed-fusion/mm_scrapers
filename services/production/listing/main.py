import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mongo_database import MongoDatabase
from mysql_database import MysqlDatabase

from MMUrlGenerator import MMUrlGenerator

import traceback

from mapping import MarketCheckFieldMaper
class TopicHandler:
    def __init__(self):
        print("transform topic handler init")
        
        pulsar_manager = PulsarManager()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.LISTINGS_UPSERT_PROD_DB)
        
        self.producer = pulsar_manager.create_producer(pulsar_manager.topics.DOWNLOAD_IMAGE)
        
        self.mongodb = MongoDatabase()
        
        self.mysqldb = MysqlDatabase()
        
        self.urlGenerator = MMUrlGenerator()
        
        self.mc_mapper = MarketCheckFieldMaper()
    
    
    def main(self):
        print("listening for new messages")
        while True:
        # for i in range(0,10):
            
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
                
                mapped_data = self.mc_mapper.map(data)
                
                mapped_data["Status"] = "to_parse"
                
                message["data"] = {}
                
                message["data"]["images"] = data["images"]
                
                self.mysqldb.connect()
                try:
                    result = self.mysqldb.recCustomQuery(f'SELECT ID,Status,Website_ID,mm_product_url From fl_listings WHERE registration="{mapped_data["registration"]}"')
                    
                    if len(result) == 0:
                        
                        mapped_data["create_ts"] = {"func":"now()"}
                        
                        
                        id = self.mysqldb.recInsert("fl_listings",mapped_data)
                        
                        make = mapped_data["make"]
                        model = mapped_data["model"]
                        title = mapped_data["title"]
                        
                        mm_url = self.urlGenerator.generateMMUrl(make,model,title,id)
                        
                        self.mongodb.listings_collection.update_one(where,{
                            "$set":{
                                "mysql_listing_id":id,
                                "mm_url":mm_url,
                                "status":"to_parse"
                            }
                        })
                        
                    else:
                        mysql_entry = result[0]
                        
                        if not "mysql_listing_id" in data or not "mm_url" in data:
                            self.mongodb.listings_collection.update_one(where,{"$set":{
                                "mm_url":mysql_entry["mm_product_url"],
                                "mysql_listing_id":mysql_entry["ID"]
                            }})
                            
                        status = mysql_entry["Status"]
                        
                        update_at = {"ID":mysql_entry["ID"]}
                        
                        if mysql_entry["Website_ID"] == 17:
                            if status in ["to_parse","active","pending"]:
                                data_tmp = data.copy()
                                
                                if "ltv" in data_tmp:
                                    data_tmp["ltv"] = {}
                                    
                                mapped_data = self.mc_mapper.map(data_tmp)
                                
                                mapped_data["status"] = "to_parse"
                                
                                self.mysqldb.recUpdate("fl_listings",mapped_data,update_at)
                                
                                self.mongodb.listings_collection.update_one(where,{"$set":{"status":mapped_data["status"]}})
                                
                        elif mysql_entry["Website_ID"] == 18:
                            if status in ["manual_expire","pending","sold"]:
                                self.mongodb.listings_collection.update_one(where,{"$set":{"status":status}})
                                continue
                            
                            if status in ["active"]:
                                mapped_data["Status"] = status
                                self.mysqldb.recUpdate("fl_listings",mapped_data,update_at)
                                self.mongodb.listings_collection.update_one(where,{"$set":{"status":status}})
                                continue
                            
                            if status == "expired":
                                mapped_data["Status"] = "active"
                                self.mysqldb.recUpdate("fl_listings",mapped_data,update_at)
                                self.mongodb.listings_collection.update_one(where,{"$set":{"status":mapped_data["Status"]}})
                                continue
                            
                            if status == "to_parse":
                                pass
                        else:
                            continue
                        
                        
                except Exception as e:
                    print(f'error : {str(e)}')
                    print(traceback.print_exc())
                self.mysqldb.disconnect()
                
            self.producer.produce_message(message)  
            
        
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()

