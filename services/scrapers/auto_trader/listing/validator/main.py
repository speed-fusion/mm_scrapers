import sys

sys.path.append("/libs")

from mysql_database import MysqlDatabase

from auto_trader_scraper import AutoTraderScraper

from margin_calculator import MarginCalculator

class ListingValidator:
    def __init__(self) -> None:
        
        self.mysql = MysqlDatabase()
        
        self.at_scraper = AutoTraderScraper()
        
        self.margin_calc = MarginCalculator()
    
    def main(self):
        
        self.mysql.connect()
        listings = self.mysql.recCustomQuery("SELECT ID,sourceUrl,customPriceEnabled,customPrice,registration FROM fl_listings WHERE Website_ID=17 AND Status='active'")
        self.mysql.disconnect()
        
        self.at_scraper.wd.start()
        for listing in listings:
            url = listing["sourceUrl"]
            data = self.at_scraper.fetch_listing_info(url)
            
            if data["status"] == False:
                
                self.mysql.connect()
                self.mysql.recUpdate("fl_listings",{"Status":"expired","why":"No Longer active on auto trader"},{"ID":listing["ID"]})
                self.mysql.disconnect()
                continue
            
            required_data = self.at_scraper.parse_response(data["data"])
            
            if required_data["status"] == False:
                continue
            
            source_price = required_data["price"] + required_data["admin_fee"]
            
            registration = listing["registration"]
            
            mileage = required_data["mileage"]
            
            website_id = 17
            
            forecourt_value = self.ukv.fetch_forecourt(registration,mileage,website_id)
            
            data = self.margin_calc.calculate(source_price,forecourt_value)
            
            if data["status"] == False:
                self.mysql.connect()
                self.mysql.recUpdate("fl_listings",{"Status":"expired","why":"No able to calculate margin"},{"ID":listing["ID"]})
                self.mysql.disconnect()
                continue
            
            margin = data["margin"]
            
            mm_price = data["mm_price"]
            
            lvt = self.ltv_calc.calculate()
            
            
        
        self.at_scraper.wd.stop()
            
# if __name__ == "__main__":
#     at_scraper = AutoTraderScraper()
    
#     url = "https://www.autotrader.co.uk/car-details/202207238072666"
#     at_scraper.wd.start()
#     at_scraper.wd.page.on("response",at_scraper.capture_response)
#     data = at_scraper.fetch_listing_info(url)
#     at_scraper.wd.stop()
#     print(at_scraper.parse_response(data["data"]))
# class ListingValidator:
#     def __init__(self) -> None:
#         self.wd = PlaywrightDriver()
#         self.mysql_db = MysqlDatabase()
    
#     def is_listing_active(self,url):
#         self.wd.page.goto(url)
#         self.wd.page.wait_for_load_state("networkidle")
        
#         current_url = self.wd.page.url
        
#         if "expired" in current_url:
#             return False
#         elif url in current_url:
#             return True
#         else:
#             print(f'something went wrong....')
#             return True
    
#     def get_active_listings(self):
#         self.mysql_db.connect()
#         active_listings = self.mysql_db.recCustomQuery('SELECT ID,sourceUrl FROM fl_listings WHERE Website_ID=17 AND Status="active"')
#         self.mysql_db.disconnect()
#         return active_listings
    
#     def main(self):
        
#         listings = self.get_active_listings()
#         self.wd.start()
        
#         for listing in listings:
#             url = listing["sourceUrl"]
#             status = self.is_listing_active()
            
#             if status == False:
#                 self.mysql_db.connect()
#                 self.mysql_db.recUpdate("fl_listings",{"Status":"expired","why":"no longer active on auto trader."},{"ID":listing["ID"]})
#                 self.mysql_db.disconnect()
#                 continue
            
            
            
            
        
#         self.wd.stop()