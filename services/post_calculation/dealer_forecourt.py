import sys

sys.path.append("/libs")

from mongo_database import MongoDatabase
from helper import get_current_datetime,generate_unique_uuid
import datetime
import requests

class DealerForecourt:
    def __init__(self,db):
        print("dealerForecourt init")
        self.db = db
        self.database_call_count = 0
        self.api_call_count = 0
        self.refreshDays = 30
        
        self.mongo_db = MongoDatabase()
        
    def get_vehicle_price_data(self, reg_no, mileage):

        url = "https://uk1.ukvehicledata.co.uk/api/datapackage/ValuationData?v=2&api_nullitems=1&auth_apikey=66a3af5c-3f98-4784-b5fe-c0343c23b9b0&user_tag=&key_VRM={}&key_mileage={}".format(
            reg_no, mileage
        )
        response = requests.get(url)
        return response.json()

    def get_DealerForecourt_from_response(self, json_data):
        price = json_data["Response"]["DataItems"]["ValuationList"]["DealerForecourt"]
        return price

    def get_date_from_string(self, date_str):
        date = datetime.datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        return date

    def check_response_older_than_x_days(self, updated_date):
        updated = self.get_date_from_string(str(updated_date))
        now = datetime.datetime.now()
        out = now - updated
        if out.days > self.refreshDays:
            return True
        else:
            return False

    def upsert_dealer_forecourt_mongodb(self,registration,mileage,price,response):
        
        entry_data = {}
        
        entry_data["registration"] = registration
        entry_data["mileage"] = mileage
        entry_data["forecourt_price"] = price
        entry_data["response"] = response    
        
        where = {"registration":registration}
        entry = self.mongo_db.valuation_data.find_one(where)
        
        now = get_current_datetime()
        entry_data["updated_at"] = now
        
        if entry == None:
            # insert
            entry_data["created_at"] = now
            entry_data["_id"] = generate_unique_uuid()
            self.mongo_db.valuation_data.insert_one(entry_data)
        else:
            self.mongo_db.valuation_data.update_one(where,entry_data)
    
    def get_dealerforecourt_price(self, reg_no, mileage, website_id):
        
        self.db.connect()
        try:
            DealerForecourt = None
            DealerForecourtResponse = {}
            
            rows = self.db.recSelect(
                "ukvehicledata_ValuationData", {"VRM": reg_no}
            )
            
            if len(rows) > 0:
                if self.check_response_older_than_x_days(rows[0]["updated_at"]):
                    print("new api call for price : data is 30 days older")
                    new_call = self.get_vehicle_price_data(reg_no, mileage)
                    DealerForecourtResponse = new_call
                    price = self.get_DealerForecourt_from_response(new_call)
                    updated_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    data = {}
                    data["Response"] = str(new_call)
                    data["updated_at"] = updated_time
                    data["DealerForecourt"] = price
                    DealerForecourt = int(float(price))
                    self.api_call_count = self.api_call_count + 1
                    
                    self.db.recUpdate(
                        "ukvehicledata_ValuationData", data, {"id": rows[0]["id"]}
                    )
                    
                    self.upsert_dealer_forecourt_mongodb(reg_no,mileage,price,new_call)
                    
                else:
                    print("getting data from db : data is  available in database")
                    DealerForecourt = int(rows[0]["DealerForecourt"])
                    DealerForecourtResponse = rows[0]["Response"]
                    self.database_call_count = self.database_call_count + 1
            else:
                print("new api call for price : data is not available in database")
                
                self.api_call_count = self.api_call_count + 1
                new_call = self.get_vehicle_price_data(reg_no, mileage)
                DealerForecourtResponse = new_call
                price = self.get_DealerForecourt_from_response(new_call)
                updated_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                data = {}
                data["Response"] = str(new_call)
                data["updated_at"] = updated_time
                data["DealerForecourt"] = price
                data["created_at"] = updated_time
                data["VRM"] = reg_no
                data["mileage"] = mileage
                data["Website_ID"] = website_id
                DealerForecourt = int(float(price))
                self.db.recInsert("ukvehicledata_ValuationData", data)
                self.upsert_dealer_forecourt_mongodb(reg_no,mileage,price,new_call)
                
        except Exception as e:
            print(f'error - dealerForecourt.py : {str(e)}')
            
        self.db.disconnect()
        
        return DealerForecourt,DealerForecourtResponse
    
