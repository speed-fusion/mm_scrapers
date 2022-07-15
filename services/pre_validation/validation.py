class MarketCheckValidation:
    def __init__(self) -> None:
        print("validation init")
        
    def validate(self,data):
        
        source_mrp = data["source_mrp"]
        engine_cc = data["engine_cylinders_cc"]
        built = data["built"]
        mileage = data["mileage"]
        registration = data["registration"]
        scrapped = data["scrapped"]
        imported = data["imported"]
        
        status,message = self.price_validation(source_mrp)
        log = {}
        if status == False:
            log["error_message"] = message
            return False,log
        
        status,message = self.engine_cylinders_cc_validation(engine_cc)
        
        if status == False:
            log["error_message"] = message
            return False,log
        
        status,message = self.built_validation(built)
        
        if status == False:
            log["error_message"] = message
            return False,log
        
        status,message = self.mileage_validation(mileage)
        if status == False:
            log["error_message"] = message
            return False,log
        
        status,message = self.registration_validation(registration)
        if status == False:
            log["error_message"] = message
            return False,log
        
        status,message = self.scraped_validation(scrapped)
        if status == False:
            log["error_message"] = message
            return False,log
        
        status,message = self.imported_validation(imported)
        if status == False:
            log["error_message"] = message
            return False,log
        
        return True,{"error_message":""}
    
    def registration_validation(self,registration):
        
        if registration == None:
            return False,"registration is not available"
        
        if len(registration) != 7:
            return False,f'registration({registration}) length is not equal to 7'
        
        return True,None
    
    
    def price_validation(self,price):
        
        if price == None:
            return False,"price is empty."
        
        maxPrice = 30000
        
        minPrice = 4700
        
        if price <= maxPrice and price >= minPrice:
            return True,None
        
        return False,f'price({price}) is more than max price({maxPrice}) or price is less than min price({minPrice})'
        
    def engine_cylinders_cc_validation(self,cc):
        
        return True,None
        
        if cc == None:
            return False,"engine cc is empty."
        
        maxCC = 3001
        
        if cc <= maxCC:
            return True,None
        else:
            return False,f'engineCC({cc}) is more than maxEngineCC({maxCC}).'
    
    def built_validation(self,built):
        
        if built == None:
            return False,"built year is empty."
        
        minBuilt = 2012
        
        if built >= minBuilt:
            return True,None

        return False,f'built year({built}) is less than min built year({minBuilt}).'

    def mileage_validation(self,mileage):
        
        if mileage == None:
            return False,'mileage is empty.'
        
        maxMileage = 120000
        
        if mileage < maxMileage:
            return True,None
        else:
            return False,f'mileage({mileage}) is more than maxMileage({maxMileage})'
    
    def scraped_validation(self,scrapped):
        
        if scrapped == None:
            return True,"scraped column value not available"
        
        if scrapped == True:
            return False,f'value of scraped column is True.'
        
        return True,None
    
    def imported_validation(self,imported):
        if imported == None:
            return True,"imported column value is not available"

        if imported == True:
            return False,f'value of imported column is True'

        return True,None
        
    # def isBlackListedDealer(self,dealerId):
        
    #     if dealerId == None:
    #         return False,f'dealerId is None'
        
    #     self.database.connect()
        
    #     try:
    #         dealers = self.database.recSelect("fl_dealer_blacklist",{
    #             "dealer_id":str(dealerId)
    #         })
    #     except Exception as e:
    #         dealers = None
        
    #     self.database.disconnect()
        
    #     if len(dealers) > 0:
    #         return True,f'dealerId ({dealerId}) is blacklisted.'
    #     else:
    #         return False,None
    
    