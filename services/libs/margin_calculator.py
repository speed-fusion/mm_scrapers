class MarginCalculator:
    def __init__(self) -> None:
        pass
    
    def calculate(self,source_price,forecourt_value):
        data = {}
        if source_price < 11999:
            
            percentage = 12
            print(f'percentage : {percentage}')
            data["percentage"] = percentage
            
            percent_source_price = (percentage/100) * source_price
            print(f'{percentage}% of source price : {percent_source_price}')
            
            min_percent_source_price = 1000
            
            if percent_source_price <= min_percent_source_price:
                percent_source_price = min_percent_source_price
            
            data["percent_source_price"] = percent_source_price
            
            provisional_mm_price = int(source_price + percent_source_price)
            print(f'provisional_mm_price : {provisional_mm_price}')
            data["provisional_mm_price"] = provisional_mm_price
            
            ltv_percentage = (provisional_mm_price / forecourt_value) * 100
            print(f'ltv_percentage : {ltv_percentage}')
            data["ltv_percentage"] = round(ltv_percentage)
            
            
            max_ltv_percentage = 120
            
            if ltv_percentage >= max_ltv_percentage:
                data["status"] = False
                data["message"] = f'ltv_percentage >= {max_ltv_percentage}'
                return data
            
            if ltv_percentage < 110:
                add_upto = float(forecourt_value) * 1.10
                profit_booster = add_upto - provisional_mm_price
            else:
                profit_booster = 0
            
            max_profit_booster = 3000
            
            if profit_booster >= max_profit_booster:
                profit_booster = max_profit_booster
                
            data["profit_booster"] = round(profit_booster)
            
            mm_price = provisional_mm_price + profit_booster
            
            data["mm_price"] = round(mm_price)
            
            margin = percent_source_price + profit_booster
            data["margin"] = round(margin)
            data["status"] = True            
            return data
        else:
            
            percentage = 11
            data["percentage"] = percentage
            
            ltv_percentage = 69
            data["ltv_percentage"] = round(ltv_percentage)
            
            percent_source_price = float(percentage/100) * source_price
            
            min_percent_source_price = 1000
            
            if percent_source_price <= min_percent_source_price:
                percent_source_price = min_percent_source_price
            
            max_margin = 3000
            
            if percent_source_price >= max_margin:
                percent_source_price = max_margin
            
            data["percent_source_price"] = percent_source_price
            
            mm_price = source_price + percent_source_price
            
            data["mm_price"] = round(mm_price)
            
            margin = percent_source_price
            
            data["margin"] = round(percent_source_price)
            
            data["status"] = True
            
            return data



if __name__ == "__main__":
    mc = MarginCalculator()
    
    data = mc.calculate(11491,11950)
    
    print(data)