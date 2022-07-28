from datetime import datetime
import sys

sys.path.append("/libs")

from pulsar_manager import PulsarManager

from mysql_database import MysqlDatabase


class TopicHandler:
    def __init__(self):
        
        pulsar_manager = PulsarManager()
        
        self.topics = pulsar_manager.topics
        
        self.mysql_db = MysqlDatabase()
        
        self.consumer = pulsar_manager.create_consumer(pulsar_manager.topics.CSV_PARSER_MYSQL)

        self.dealer_columns = {
                "_id":"_id",
                "dealer_id":"dealer_id",
                "dealer_name":"dealer_name",
                "fca_status":"fca_status",
                "fca_reference_no":"fca_reference_no",
                "dealer_phone":"dealer_phone",
                "street":"street",
                "city":"city",
                "county":"county",
                "postal_code":"postal_code",
                "latitude":"latitude",
                "longitude":"longitude",
                "country":"country",
                "updated_at":"updated_at",
                "created_at":"created_at",
                "website_id":"website_id",
                "status":"status"
            }
        
        self.listing_columns = {
            "_id":"_id",
            "source_url":"source_url",
            "price":"price",
            "mileage":"mileage",
            "built":"built",
            "make":"make",
            "model":"model",
            "trim":"trim",
            "body_style":"body_style",
            "fuel":"fuel",
            "transmission":"transmission",
            "doors":"doors",
            "registration":"registration",
            "registration_date":"registration_date",
            "exterior_color":"exterior_color",
            "dealer_id":"dealer_id",
            "dealer_name":"dealer_name",
            "dealer_number":"dealer_number",
            "dealer_location":"dealer_location",
            "cab_type":"cab_type",
            "seats":"seats",
            "write_off_category":"write_off_category",
            "price_indicator":"price_indicator",
            "vehicle_type":"vehicle_type",
            "euro_status":"euro_status",
            "imported":"imported",
            "scrapped":"scrapped",
            "engine_cylinders_cc":"engine_cylinders_cc",
            "status":"status"
        }
    
    def column_mapping(self,data,table):
        final_data = {}
        if table == "market_check_dealers":
            
            for item in data:
                if item in self.dealer_columns:
                    final_data[item] = data[item]
        elif table == "market_check_listings":
            for item in data["raw"]:
                if item in self.listing_columns:
                    final_data[item] = data["raw"][item]
        else:
            final_data = data
        return final_data
        
    def main(self):
        # while True:
        for i in range(0,5):
            message =  self.consumer.consume_message()
            print(message)
            self.mysql_db.connect()
            
            table = message["table"]
            
            what = self.column_mapping( message["what"],table)
            
            print(what)
            
            if table == "market_check_dealers":
                dealer_id = what.get("dealer_id",None)
                if dealer_id == None:
                    continue
                where = {"dealer_id":what["dealer_id"]}
            elif table == "market_check_listings":
                registration = what.get("registration",None)
                if registration == None:
                    continue
                where = {"registration":what["registration"]}
            
            result = self.mysql_db.recSelect(table,where)
            what["updated_at"] = {"func":"now()"}
            
            if len(result) > 0:
                self.mysql_db.recUpdate(table,what,{"id":result[0]["id"]})
            else:
                what["created_at"] = {"func":"now()"}
                self.mysql_db.recInsert(table,what)
                
            self.mysql_db.disconnect()
            
            
if __name__ == "__main__":
    topic_handler = TopicHandler()
    topic_handler.main()