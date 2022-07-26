
import pymongo
from helper import generate_unique_uuid, get_current_datetime
import mm_constants

class MongoDatabase:
    def __init__(self):
        self.user = mm_constants.MONGO_USERNAME
        self.password = mm_constants.MONGO_PASSWORD
        self.host = mm_constants.MONGO_HOST
        self.database = mm_constants.MONGO_DATABASE
        connection_uri = f'mongodb://{self.user}:{self.password}@{self.host}/?authSource=admin'
        client = pymongo.MongoClient(connection_uri)
        self.db = client[self.database]
        self.car_cutter_logs = client["car_cutter_logs"]
        
        self.listing_counts = self.db["listing-counts"]
        
        # market check
        self.listings_collection = self.db["listings"]
        
        self.dealers_collection = self.db["dealers"]
        
        self.images_collection = self.db["images"]
        
        self.valuation_data = self.db["valuation-data"]
        
        self.listing_event_collection = self.db["listing-events"]
        
        self.report_event_collection = self.db["report-events"]
    
    def insert_event(self,collection,data):
        now = get_current_datetime()
        
        data["created_at"] = now
        
        collection.insert_one(data)
    
    def increase_count(self,count_type):
        now = get_current_datetime()
        
        date = now.strftime("%d-%m-%Y")
        
        result = self.listing_counts.find_one({"date":date,"type":count_type})
        
        if result == None:
            self.listing_counts.insert_one({
                "_id":generate_unique_uuid(),
                "date":date,
                "type":count_type,
                "count":1,
                "created_at":now,
                "updated_at":now
            })
            
            return

        self.listing_counts.update_one({"_id":result["_id"]},{"$inc":{"count":1}})