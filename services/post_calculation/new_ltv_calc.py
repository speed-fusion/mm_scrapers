import json
import sys


sys.path.append("/libs")

from helper import get_current_datetime

from mysql_database import MysqlDatabase

from dealer_forecourt import DealerForecourt

from ltv import LtvCalculationRules

from old_margin_calculation import OldMarginCalculation

from mongo_database import MongoDatabase

class MarketCheckLtvCalculationRules:
    
    def __init__(self) -> None:
        self.mysql_db = MysqlDatabase()
        self.dealer_forecourt = DealerForecourt(self.mysql_db)
        self.old_ltv = LtvCalculationRules()
        self.old_margin_calc = OldMarginCalculation()
        self.mongodb = MongoDatabase()
    
    
    def calculate_old_margin(self,make,model,engine_cc):
        
        margin = self.old_margin_calc.calculateMargin(make,model,engine_cc)
        
        return margin
    
    def calculate(self,source_price,registration,mileage,website_id,make,model,engine_cc,listing_id):
        
        if source_price < 11999:
            
            forecourt_value,forecourt_response = self.dealer_forecourt.get_dealerforecourt_price(registration,mileage,website_id)
            
            print(f'forecourt_value -> {forecourt_value} , source_price -> {source_price}')
    
            if forecourt_value == None:
                event_data = {}
                event_data["_id"] = f'{registration}_forecourt_value_not_available'
                event_data["name"] = "forecourt_value_not_available"
                event_data["make"] = make
                event_data["model"] = model
                event_data["registration"] = registration
                event_data["mileage"] = mileage
                event_data["listing_id"] = listing_id
                event_data["created_at"] = get_current_datetime()
                
                try:
                    self.mongodb.report_event_collection.insert_one(event_data)
                except Exception as e:
                    print(f'error : {str(e)}')
                
                return {
                    "status":False,
                    "forecourt_call":True,
                    "mm_price":None,
                    "margin":None,
                    "ltv":self.old_ltv.getNullValues(),
                    "response":json.dumps(forecourt_response),
                    "ltv_status":0,
                    "message":f'{registration} : forecourt fetch failed.'
                }
            
            percentage = 12
            
            percent_source_price = (percentage/100) * source_price
            
            min_margin_1 = 1000
            
            if percent_source_price <= min_margin_1:
                percent_source_price = min_margin_1
            
            provisional_mm_price =int(source_price + percent_source_price)
            
            margin_1 = percent_source_price
            
            ltv_percentage = (provisional_mm_price / forecourt_value) * 100
            
            if ltv_percentage >= 120:
                
                event_data = {}
                event_data["_id"] = f'{registration}_ltv_percentage_>=120'
                event_data["name"] = "ltv_percentage_>=120"
                event_data["make"] = make
                event_data["model"] = model
                event_data["registration"] = registration
                event_data["mileage"] = mileage
                event_data["listing_id"] = listing_id
                event_data["ltv_percentage"] = ltv_percentage
                event_data["provisional_mm_price"] = provisional_mm_price
                event_data["forecourt_value"] = forecourt_value
                event_data["created_at"] = get_current_datetime()
                
                try:
                    self.mongodb.report_event_collection.insert_one(event_data)
                except Exception as e:
                    print(f'error : {str(e)}')
                
                return {
                    "status":False,
                    "forecourt_call":True,
                    "mm_price":None,
                    "margin":None,
                    "forecourt_price":forecourt_value,
                    "ltv":{},
                    "response": json.dumps(forecourt_response),
                    "ltv_status":0,
                    "message":f'{registration} ltv percentage >= 120'
                }
                
            
            if ltv_percentage < 110:
                add_upto = float(forecourt_value) * 1.10
                profit_booster = add_upto - provisional_mm_price
            else:
                profit_booster = 0
            
            max_margin = 3000
            
            if profit_booster >= max_margin:
                profit_booster = max_margin
            
            mm_price = provisional_mm_price + profit_booster
            
            margin = margin_1 + profit_booster
            
            final_ltv = self.old_ltv.calculate(mm_price,forecourt_value)
            
            # if engine_cc != None:
            #     if engine_cc <= 3001:
            #         old_margin = self.calculate_old_margin(make,model,engine_cc)
            #         old_mm_price = source_price + old_margin
            #         final_ltv = self.old_ltv.calculate(old_mm_price,forecourt_value)
            #     else:
            #         final_ltv = self.old_ltv.calculate(mm_price,forecourt_value)
            # else:
            #     final_ltv = self.old_ltv.calculate(mm_price,forecourt_value)
            
            return  {
                    "status":True,
                    "forecourt_call":True,
                    "mm_price":int(mm_price),
                    "forecourt_price":forecourt_value,
                    "margin":int(margin),
                    "response": json.dumps(forecourt_response),
                    "ltv":final_ltv,
                    "ltv_percentage":ltv_percentage,
                    "ltv_status":1,
                    "message":None
                }
        
        else:
            percentage = 11
            
            ltv_percentage = 69
            
            percent_source_price = float(percentage/100) * source_price
            
            min_margin_1 = 1000
            
            if percent_source_price <= min_margin_1:
                percent_source_price = min_margin_1
            
            max_margin = 3000
            
            if percent_source_price >= max_margin:
                percent_source_price = max_margin
            
            mm_price = source_price + percent_source_price
            
            margin = percent_source_price
            
            return  {
                    "status":True,
                    "forecourt_call":False,
                    "mm_price":int(mm_price),
                    "margin":int(margin),
                    "ltv":self.old_ltv.getDefaultValues(),
                    "ltv_percentage":ltv_percentage,
                    "ltv_status":None,
                    "message":None
                }


if __name__ == "__main__":
    
    ltv_calc = LtvCalculationRules()
    
    print(ltv_calc.calculate(5357,4870))