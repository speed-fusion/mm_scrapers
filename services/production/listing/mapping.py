class MarketCheckFieldMaper:
    def __init__(self) -> None:
        
        self.insert_field_map = [
            {'key': 'source_id', 'value': 'sourceId'},
            {'key': 'source_url', 'value': 'sourceUrl'},
            {'key': 'account_id', 'value': 'Account_ID'},
            {'key': 'website_id', 'value': 'Website_ID'},
            {'key': 'featured_id', 'value': 'Featured_ID'},
            {'key': 'plan_id', 'value': 'Plan_ID'},
            {'key': 'priority', 'value': 'Priority'},
            {'key': 'admin_fee', 'value': 'admin_fees'},
            {'key': 'body_style', 'value': 'body_style'},
            {'key': 'built', 'value': 'built'},
            {'key': 'cab_type', 'value': 'cabType'},
            {'key': 'dealer_id', 'value': 'dealer_id'},
            {'key': 'dealer_location', 'value': 'dealer_location'},
            {'key': 'dealer_name', 'value': 'dealer_name'},
            {'key': 'dealer_phone', 'value': 'dealer_number'},
            {'key': 'doors', 'value': 'doors'},
            {'key': 'emission_scheme', 'value': 'emission_scheme'},
            {'key': 'engine_cylinders_cc', 'value': 'engineCylindersCC'},
            {'key': 'engine_cylinders_litre', 'value': 'engine_cylinders'},
            {'key': 'fuel_code', 'value': 'fuel'},
            {'key': 'location', 'value': 'location_json'},
            {'key': 'predicted_make', 'value': 'make'},
            {'key': 'predicted_model', 'value': 'model'},
            {'key': 'mileage', 'value': 'mileage'},
            {'key': 'price_indicator', 'value': 'price_indicator'},
            {'key': 'predicted_registration', 'value': 'registration'},
            {'key': 'category_id', 'value': 'Category_ID'},
            {'key': 'seats', 'value': 'seats'},
            {'key': 'source_mrp', 'value': 'sourcePrice'},
            {'key': 'title', 'value': 'title'},
            {'key': 'transmission_code', 'value': 'transmission'},
            {'key': 'transmission', 'value': 'transmission_org'},
            {'key': 'trim', 'value': 'trim'},
            {'key': 'vehicle_type', 'value': 'vehicle_type'},
            {'key': 'margin', 'value': 'margin'},
            {'key': 'mm_price', 'value': 'mmPrice'},
            {'key': 'cc_extra_margin', 'value': 'cc_extra_margin'},
            {'key': 'forecourt_110', 'value': 'forecourt_110'},
            {'key': 'registration_date', 'value': 'registration_date'},
            {'key': 'total_photos', 'value': 'Photos_count'},
            {'key':'source_url','value':'sourceUrl'},
            {'key':'source_url','value':'product_url'},
            {'key':'make','value':'orignalMake'},
            {'key':'model','value':'orignalModel'},
            {'key':'model','value':'model_org'},
            {'key':'predicted_make','value':'predictedMake'},
            {'key':'predicted_model','value':'predictedModel'},
            {'key':'registration','value':'orignalRegistration'},
            {'key':'predicted_registration','value':'predictedRegistration'},
            {'key':'engine_cylinders_litre','value':'engineCylindersLitre'},
            {'key':'org_body_style','value':'orignalBodyStyle'},
            {'key':'pred_body_style','value':'predictedBodyStyle'},
            {'key':'dealer_forecourt_response','value':'dealerForecourtResponse'},
            {'key':'forecourt_price','value':'dealerForecourtPrice'},
            {'key':'forecourt_110','value':'forecourt_110'},
            {'key':'mm_price','value':'price'},
            {'key':'registration','value':'product_website_id'},
            {'key':'ltv_status','value':'ltvStatus'},
            {'key':'video_id','value':'video_id'},
            {'key':'website_id','value':'Website_ID'},
            {'key':'plan_id','value':'Plan_ID'},
            {'key':'account_id','value':'Account_ID'},
            {'key':'exterior_color','value':'exterior_color'},
            {'key':'interior_color','value':'interior_color'},
            {'key':'dealer_number','value':'dealer_number'},
            {'key':'source_price','value':'cal_price_from_file'},
            {'key':'registration','value':'product_website_id'},
            {'key':'ltv_percentage','value':'ltv_percentage'},
            {'key':'registration','value':'reference_number'},
            ]
        
    def map(self,data):
        tmp = {}
        
        
        for key in data:
            for item in self.insert_field_map:
                if item["key"] == key:
                    if item["value"] == "price":
                        tmp[item["value"]] = str(int(data[key]))
                    else:
                        tmp[item["value"]] = data[key]
        
        if "ltv" in data:
            ltv = data["ltv"]
            for key in ltv:
                tmp[key] = ltv[key]

        if "pcp_apr" in data:
            pcp_apr = data["pcp_apr"]
            for key in pcp_apr:
                tmp[key] = pcp_apr[key]
        if not "emission_scheme" in tmp:
            tmp["emission_scheme"] = 99
        return tmp