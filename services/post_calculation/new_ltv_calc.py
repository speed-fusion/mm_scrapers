class MarketCheckLtvCalculationRules:
    
    def __init__(self) -> None:
        pass
    
    def calculate(self,source_price,forecourt_value):
        
        print(f'forecourt_value -> {forecourt_value} , source_price -> {source_price}')
        
        if source_price < 11999:
            percentage = 12
            
            percent_source_price = (percentage/100) * source_price
            
            provisional_mm_price = float(source_price + percent_source_price)
            
            ltv = round(provisional_mm_price / float(forecourt_value * 100),1)
            
            if ltv >= 120:
                return {
                    "status":False,
                    "mm_price":None,
                    "margin":None
                }
                #  need to log this event
            
            if ltv < 110:
                max_margin = float(forecourt_value) * 1.10
                margin = max_margin - provisional_mm_price
            else:
                margin = 0
            
            mm_price = provisional_mm_price + margin
            
            return  {
                    "status":True,
                    "mm_price":int(mm_price),
                    "margin":int(margin)
                }
        
        else:
            percentage = 11
            
            percent_source_price = float(percentage/100) * source_price
            
            max_margin = 3000
            
            if percent_source_price >= max_margin:
                margin = max_margin
            else:
                margin = percent_source_price
            
            mm_price = source_price + margin
            
            return  {
                    "status":True,
                    "mm_price":int(mm_price),
                    "margin":int(margin,1)
                }


# if __name__ == "__main__":
    
#     ltv_calc = LtvCalculationRules()
    
#     print(ltv_calc.calculate(8655,9950))