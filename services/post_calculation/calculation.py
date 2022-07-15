import sys

sys.path.append("/libs")

from mysql_database import MysqlDatabase

from admin_fee import MarketCheckAdminFee

from pcp_apr import MarketCheckPcpAprCalculation

from ltv import LtvCalculationRules

from dealer_forecourt import DealerForecourt

import json

from video_id import VideoId

from category_id import CategoryId

from new_ltv_calc import MarketCheckLtvCalculationRules

class MarketCheckCalculation:
    
    def __init__(self) -> None:
        self.mysql_db = MysqlDatabase()
        self.category_id_calc = CategoryId(self.mysql_db)
        
        self.mc_admin_fee = MarketCheckAdminFee()
        
        self.mc_pcp_apr = MarketCheckPcpAprCalculation()
        
        self.mc_ltv = LtvCalculationRules()
        
        
        
        self.video_id = VideoId()
        
        self.mc_calc_rules = MarketCheckLtvCalculationRules()
        
    
    def update_admin_fee(self,data):
        
        dealer_id = data["dealer_id"]
        
        listing_admin_fee = data["admin_fee"]
        
        dealer_admin_fee = self.mc_admin_fee.get_admin_fee(dealer_id)
        
        if dealer_admin_fee > listing_admin_fee:
            data["admin_fee"] = dealer_admin_fee
        
    
    def calculate_source_mrp(self,data):
        
        source_price = data["source_price"]
        
        admin_fee = data["admin_fee"]
        
        data["source_mrp"] = source_price + admin_fee
    
    
    # def calculate_margin(self,data):
    #     fixed_margin = 1299
    #     data["margin"] = fixed_margin
    
    # def calculate_motor_market_price(self,data):
        
    #     custom_price_enabled = data.get("custom_price_enabled",False)
        
    #     if custom_price_enabled == True:
    #         custom_price = data["custom_price"]
    #         data["mm_price"] = custom_price
    #         source_mrp = data["source_mrp"]
    #         data["margin"] = custom_price - source_mrp
    #         return
        
    #     data["mm_price"] = data["source_mrp"] + data["margin"]
    
    def calculate_pcp_apr(self,data):
        
        mm_price = data["mm_price"]
        
        mileage = data["mileage"]
        
        built = data["built"]
        
        pcp_apr = self.mc_pcp_apr.calculate_apr_pcp(mm_price,mileage,built)
        
        data["pcp_apr"] = pcp_apr
    

    
    def calculate_ltv(self,data):
        
        source_mrp = data["source_mrp"]
        
        registration = data["registration"]
        
        mileage = data["mileage"]
        
        website_id = data["website_id"]
        
        ltv_resp = self.mc_calc_rules.calculate(source_mrp,registration,mileage,website_id)
        
        if ltv_resp["status"] == True:
            mm_price = ltv_resp["mm_price"]
            margin = ltv_resp["margin"]
            ltv_percentage = ltv_resp["ltv_percentage"]
            old_ltv_values = ltv_resp["ltv"]
            ltv_status =ltv_resp["ltv_status"]
            if ltv_resp["forecourt_call"] == True:
                response = ltv_resp["response"]
                data["dealer_forecourt_response"] = response
                data["forecourt_price"] = ltv_resp["forecourt_value"]
            data["mm_price"] = mm_price
            data["margin"] = margin
            data["ltv_percentage"] = ltv_percentage
            data["ltv"] = old_ltv_values
            data["ltv_status"] = ltv_status
            return True
        else:
            return False
        
        # ltv = {}
        
        # if source_mrp < 11999:
            
        #     forecourt_price,response = self.dealer_forecourt.get_dealerforecourt_price(registration,mileage,website_id)

        #     if forecourt_price == None:
                
        #         data["ltv_status"] = 0
                
        #         data["dealer_forecourt_response"] = json.dumps(response)
                
        #         ltv.update(self.mc_ltv.getNullValues())
                
        #         return False
            
        #     else:
                
        #         ltv_res = self.mc_calc_rules.calculate(source_mrp,forecourt_price)
                
        #         if ltv_res["status"] == False:
        #             return False
                
        #         mm_price = ltv_res["mm_price"]
                
        #         margin = ltv_res["margin"]
                
        #         data["mm_price"] = mm_price
                
        #         data["margin"] = margin
                
        #         ltv = self.mc_ltv.calculate(mm_price,forecourt_price)
                
        #         data["forecourt_price"] = forecourt_price
                
        #         data["ltv_status"] = 1
        # else:
        #     ltv = self.mc_ltv.getDefaultValues()
            
        #     data["ltv_status"] = 2
        
        # data["ltv"] = ltv
        
        return True
        
        
        
        
    
    def calculate_category_id(self,data):
        make = data["make"]
        model = data["model"]
        
        category_id = self.category_id_calc.getCategoryId(make,model)
        
        data["category_id"] = category_id

    def calculate_video_id(self,data):
        
        make = data.get("predicted_make")
        
        model = data.get("predicted_model")
        
        built = data.get("built",None)
        
        try:
            videoId = self.video_id.get_video_id(make,model,built)
        except Exception as e:
            print(f'error - calculation.py : not able to get video id : {str(e)}')
            videoId = None
            
        if videoId != None:
            data["video_id"] = videoId
    
    def car_cutter_extra_margin(self,data):
        if data["source_mrp"] > 11999:
            extra_margin = 200
            data["cc_extra_margin"] = extra_margin
            data["margin"] = data["margin"] + extra_margin
            data["mm_price"] = data["mm_price"] + extra_margin
        else:
            data["cc_extra_margin"] = 0