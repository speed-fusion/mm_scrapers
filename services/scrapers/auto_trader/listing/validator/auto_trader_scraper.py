import sys

sys.path.append("/libs")

from playwright_driver import PlaywrightDriver
# from mysql_database import MysqlDatabase

class AutoTraderScraper:
    def __init__(self) -> None:
        self.wd = PlaywrightDriver()
        self.current_listing_data = None
    
    def capture_response(self,response):
        target_url = "https://www.autotrader.co.uk/at-graphql?opname=FPADataQuery"
        
        response_url = response.url
        
        if response_url == target_url:
            try:
                json_data = response.json()
                self.current_listing_data = json_data
            except Exception as e:
                print(f'error : {str(e)}')
            print(response_url)

        
    
    def fetch_listing_info(self,url):
        
        self.wd.page.goto(url)
        
        self.wd.page.wait_for_load_state("networkidle")
        
        current_url = self.wd.page.url
        
        status = None
        
        if "expired" in current_url:
            status = False
        elif url in current_url:
            status = True
        else:
            print(f'something went wrong....')
            status = True

        current_listing_data = self.current_listing_data
        
        self.current_listing_data = None
        
        return {
            "status":status,
            "data":current_listing_data
        }
    def parse_mileage(self,advert):
        mileage = None
        try:
            mileage = advert["mileage"]["mileage"]
        except:
            pass
        return mileage

    def parse_admin_fee(self,advert):
        admin_fee = advert.get("adminFee",None)
        
        if admin_fee == None:
            admin_fee = 0
        return admin_fee
    
    
    def parse_response(self,data):
        try:
            advert = data[0]["data"]["search"]["advert"]
            
            admin_fee = self.parse_admin_fee(advert)
            
            price = advert.get("price",None)
            
            mileage = self.parse_mileage(advert)
            
            return {
                "status":True,
                "admin_fee":admin_fee,
                "price":price,
                "mileage":mileage
            }
        except:
            return {
                "status":False
            }