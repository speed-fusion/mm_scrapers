import sys

sys.path.append("/libs")

from mongo_database import MongoDatabase

from helper import generate_unique_uuid,get_current_datetime,clean_int,generate_sha1

from mm_constants import MarketCheckConstants

import json
from pathlib import Path
import shutil
import pandas as pd
import numpy as np
from clean_dealers import CleanDealers

from mysql_database import MysqlDatabase


class MarketCheck:
    
    def __init__(self,csv_parser_mysql) -> None:
        
        self.csv_parser_mysql = csv_parser_mysql
        self.cwd = Path.cwd()
        
        self.new_files_dir = self.cwd.joinpath("new_files")
        
        self.processed_files_dir = self.cwd.joinpath("processed_files")
        
        if not self.new_files_dir.exists():
            self.new_files_dir.mkdir()
        
        if not self.processed_files_dir.exists():
            self.processed_files_dir.mkdir()
        
        self.account_id = MarketCheckConstants.ACCOUNT_ID.value
    
        self.plan_id = MarketCheckConstants.PLAN_ID.value
        
        self.featured_id = MarketCheckConstants.FEATURED_ID.value
        
        self.website_id = MarketCheckConstants.WEBSITE_ID.value
        
        self.priority = MarketCheckConstants.PRIORITY.value
        
        self.mongodb = MongoDatabase()
        
        self.clean_dealers = CleanDealers
        
        self.mysql_db = MysqlDatabase()
    
    def replace_na_with_none(self,item):
        
        if pd.isna(item) == True:
            return None
        else:
            return item
            
    
    def parse_dealers(self,df:pd.DataFrame):
        columns = ["dealer_id","seller_name","fca_status","fca_reference_no","seller_phone","street","city","county","postal_code","latitude","longitude","country"]
        # dealer_df = df.where(pd.notnull(df), None)[columns]
        dealer_df = df[columns]
        
        dealer_df = dealer_df[dealer_df.seller_name.notna()]
        
        dealer_df.drop_duplicates(inplace=True)
        
        for index,row in dealer_df.iterrows():
            row_dict = row.to_dict()
            tmp = {}
            
            tmp["dealer_id"] = clean_int(row_dict["dealer_id"])
            
            tmp["dealer_name"] = self.replace_na_with_none(row_dict["seller_name"])
            
            tmp["fca_status"] = self.replace_na_with_none(row_dict["fca_status"])
            
            tmp["fca_reference_no"] = self.replace_na_with_none(row_dict["fca_reference_no"])
            
            tmp["dealer_phone"] = self.replace_na_with_none(row_dict["seller_phone"])
            
            tmp["street"] = self.replace_na_with_none(row_dict["street"])
            
            tmp["city"] = self.replace_na_with_none(row_dict["city"])
            
            tmp["county"] = self.replace_na_with_none(row_dict["county"])
            
            tmp["postal_code"] = self.replace_na_with_none(row_dict["postal_code"])
            
            tmp["latitude"] = self.replace_na_with_none(row_dict["latitude"])
            
            tmp["longitude"] = self.replace_na_with_none(row_dict["longitude"])
            
            tmp["country"] = self.replace_na_with_none(row_dict["country"])
            
            yield tmp
            
    def parse_engine_size(self,text):
        try:
            tmp = float(text.replace("L","").strip())
            return int(tmp * 1000)
        except:
            return None
    
    def is_clean_dealer(self,dealer_id):
        try:
            d_id = int(dealer_id)
            if d_id in self.clean_dealers:
                return True
            else:
                return False
        except:
            return False
    
    def parse_listings(self,df:pd.DataFrame):
        
        listing_df = df.where(pd.notnull(df), None)
        listing_df.drop_duplicates(inplace=True)
        
        for index,row in listing_df.iterrows():
            try:
                row_dict = row.to_dict()
                tmp = {}
                data = {}
                data["source_id"] = self.replace_na_with_none(row_dict["id"])
                tmp["source_url"] = self.replace_na_with_none(row_dict["vdp_url"])
                tmp["price"] = self.replace_na_with_none(row_dict["price"])
                tmp["mileage"] = self.replace_na_with_none(row_dict["miles"])
                tmp["built"] = self.replace_na_with_none(row_dict["year"])
                tmp["make"] = self.replace_na_with_none(row_dict["make"])
                tmp["model"] = self.replace_na_with_none(row_dict["model"])
                tmp["trim"] = self.replace_na_with_none(row_dict["variant"])
                tmp["body_style"] = self.replace_na_with_none(row_dict["body_type"])
                tmp["fuel"] = self.replace_na_with_none(row_dict["fuel_type"])
                tmp["fuel_type"] = self.replace_na_with_none(row_dict["fuel_type"])
                tmp["transmission"] = self.replace_na_with_none(row_dict["transmission"])
                tmp["doors"] = self.replace_na_with_none(row_dict["doors"])
                tmp["registration"] = self.replace_na_with_none(row_dict["vehicle_registration_mark"])
                
                if tmp["registration"] != None:
                    tmp["registration"] = str(tmp["registration"]).replace(" ","").strip().upper()
                
                tmp["registration_date"] = self.replace_na_with_none(row_dict["vehicle_registration_date"])
                tmp["exterior_color"] = self.replace_na_with_none(row_dict["exterior_color"])
                tmp["dealer_id"] = clean_int(self.replace_na_with_none(row_dict["dealer_id"]))
                tmp["dealer_name"] = self.replace_na_with_none(row_dict["seller_name"])
                tmp["dealer_number"] = self.replace_na_with_none(row_dict["seller_phone"])
                tmp["dealer_location"] = self.replace_na_with_none(row_dict["postal_code"])
                tmp["cab_type"] = None
                tmp["seats"] = None
                tmp["write_off_category"] = None
                tmp["doors"] = self.replace_na_with_none(row_dict["doors"])
                tmp["interior_color"] = self.replace_na_with_none(row_dict["interior_color"])
                tmp["exterior_color"] = self.replace_na_with_none(row_dict["exterior_color"])
                tmp["price_indicator"] = None
                tmp["admin_fee"] = "0"
                tmp["vehicle_type"] = "car"
                tmp["euro_status"] = self.replace_na_with_none(row_dict["euro_status"])
                tmp["imported"] = self.replace_na_with_none(row_dict["imported"])
                tmp["scrapped"] = self.replace_na_with_none(row_dict["scrapped"])
                # car_street
                # car_city
                # car_county
                # car_postal_code
                tmp["car_location"] = json.dumps(
                    {
                    "car_street":self.replace_na_with_none(row_dict["car_street"]),
                    "car_city":self.replace_na_with_none(row_dict["car_city"]),
                    "car_county":self.replace_na_with_none(row_dict["car_county"]),
                    "car_postal_code":self.replace_na_with_none(row_dict["car_postal_code"]),
                }
                )
                
                tmp["car_postal_code"] = self.replace_na_with_none(row_dict["car_postal_code"])
                
                if tmp["car_postal_code"] != None:
                    tmp["car_postal_code"] = str(tmp["car_postal_code"]).replace(" ","").strip().upper()
                
                tmp["location"] = json.dumps(
                    {
                    "street":row_dict["street"],
                    "city":row_dict["city"],
                    "county":row_dict["county"],
                    "postal_code":row_dict["postal_code"],
                    "country":row_dict["country"]
                }
                )
                
                tmp["dealer_location"] = self.replace_na_with_none(row_dict["postal_code"])
                tmp["images"] = []
                if type(row_dict["photo_links"]) == str:
                    for i in row_dict["photo_links"].split("|"):
                        if len(i) < 6:
                            continue
                        tmp["images"].append({
                            "url":i
                        })
                
                tmp["engine_cylinders_cc"] = self.parse_engine_size(row_dict["engine_size"])
                
                data["account_id"] = self.account_id
                data["website_id"] = self.website_id
                data["featured_id"] = self.featured_id
                data["plan_id"] = self.plan_id
                data["priority"] = self.priority
                data["raw"] = tmp
                yield data
                
            except Exception as e:
                print(f'error : {str(e)}')
                print(row_dict)
    
    def apply_filters(self,df):
        # price should not be null
        df = df[df.price.notna()]
        
        # miles should not be null
        df = df[df.miles.notna()]
        
        # registration should not be null
        df = df[df.vehicle_registration_mark.notna()]
        
        # min price should be 30000
        # df = df[df.price < 30000]
        
        # max miles should be 120000
        # df = df[df.miles < 120000]
        
        # min year should be 2012
        # df = df[df.year > 2012]
        
        
        # registration length should be 7
        df["registration_length"] = df.vehicle_registration_mark.apply(lambda x: len(str(x)))
        df = df[df.registration_length == 7]
        
        # min price should be 4700
        # df = df[df.price >= 4700]
        
        # make should not be null
        df = df[df.make.notna()]
        
        # model should not be null
        df = df[df.model.notna()]
        
        df["make"] = df.make.astype(str).str.title()
        
        df["model"] = df.model.astype(str).str.title()
        
        return df
    
    def get_unique_registration(self,df):
        
        regs = set()
        
        df["registration"] = df.vehicle_registration_mark.astype(str).str.upper()
        
        unique_reg = df["registration"].unique()
        
        for item in unique_reg:
            if pd.isna(item) == False:
                regs.add(item)
        
        return regs
    
    
    
    def get_dropdown_data(self,df):
    
        dropdown_data = []

        dropdown = df[["make","model","variant"]]
        dropdown.drop_duplicates(inplace=True)
        dropdown.dropna(inplace=True)
        dropdown["make"] = dropdown.make.astype(str).str.lower()
        dropdown["model"] = dropdown.model.astype(str).str.lower()
        dropdown["variant"] = dropdown.variant.astype(str).str.lower()
        dropdown.drop_duplicates(inplace=True)
        dropdown["make"] = dropdown.make.astype(str).str.title()
        dropdown["model"] = dropdown.model.astype(str).str.title()
        dropdown["variant"] = dropdown.variant.astype(str).str.title()
        dropdown.rename(columns={"variant":"trim"},inplace=True)
        
        for index,row in dropdown.iterrows():
            item = row.to_dict()
            id = generate_sha1(item)
            item["_id"] = id
            dropdown_data.append(item)
        
        return dropdown_data
    
    
    
    def insert_dropdown_data(self,data):
        for item in data:
            try:
                self.mongodb.dropdown_collection.insert_one(item)
            except:
                pass
            
    def deactivate_mysql_expired_listings(self,registration_numbers):
        
        if len(registration_numbers) == 0:
            return
        
        self.mysql_db.connect()
        result = self.mysql_db.recCustomQuery(f'SELECT DISTINCT(registration) FROM fl_listings WHERE Website_ID=18 AND Status="active"')
        self.mysql_db.disconnect()
        
        active_registration = [item["registration"] for item in result]
        
        self.mysql_db.connect()
        for reg in active_registration:
            if not reg in registration_numbers:
                where = {"registration":reg}
                what = {"Status":"expired","why":"this listing was not present in latest market check csv.","updated_at":{"func":"now()"}}
                self.mysql_db.recUpdate("fl_listings",what,where)
        
        self.mysql_db.disconnect()
    
    
    def deactivate_mongo_expired_listings(self,registration_numbers):
        
        if len(registration_numbers) == 0:
            return
        
        
        tmp = self.mongodb.listings_collection.distinct("raw.registration")
        
        active_registration = []
        
        for item in tmp:
            if item != None:
                active_registration.append(str(item).upper().strip())
        
        for reg in active_registration:
            if not reg in registration_numbers:
                self.mongodb.listings_collection.delete_one({"raw.registration":{"$regex":reg,"$options":"i"}})
                print(f'registration : {reg} -> deleted')
            else:
                print(f'registration : {reg} -> exists')

    def parse_csv(self,filepath):
        print("reading csv...")
        df = pd.read_csv(filepath)
        
        print("applying filters...")
        df = self.apply_filters(df)
        
        print("generating dropdown values...")
        # dropdown_data = self.get_dropdown_data(df)
        
        # print("inserting dropdown values ...")
        # self.insert_dropdown_data(dropdown_data)
        
        # print("getting unique registration...")
        # unique_reg = self.get_unique_registration(df)
        
        # print("deactivating expired listings")
        # self.deactivate_mysql_expired_listings(unique_reg)
        
        # print("deleting mongo expired listings...")
        # self.deactivate_mongo_expired_listings(unique_reg)
        
        # df = df[df.dealer_id.apply(lambda x:self.is_clean_dealer(x))]
        print("parsing dealers...")
        dealers = self.parse_dealers(df)
        
        print("parsing listings...")
        listings = self.parse_listings(df)
        
        return listings,dealers
    
    def move_file(self,src,dest):
        try:
            shutil.move(src,dest)
        except Exception as e:
            print(f'error : {str(e)}')
    
    def get_active_dealer_ids(self):
        dealer_ids = {}
        for dealer in self.mongodb.dealers_collection.find({"status":"active"}):
            dealer_ids[dealer["dealer_id"]] = 1
        return dealer_ids
    
    def upsert_dealers(self,dealers):
        for dealer in dealers:
            
            what = dealer
            
            where = {"dealer_id":dealer["dealer_id"],"website_id":MarketCheckConstants.WEBSITE_ID.value}
            
            result = self.mongodb.dealers_collection.find_one(where)
            
            what["updated_at"] = get_current_datetime()
            
            if result == None:
                what["created_at"] = get_current_datetime()
                id = generate_unique_uuid()
                
                what["_id"] = id
                what["website_id"] = MarketCheckConstants.WEBSITE_ID.value
                what["status"] = "inactive"
                
                self.mongodb.dealers_collection.insert_one(what)
                # self.csv_parser_mysql.produce_message({
                #     "table":"market_check_dealers",
                #     "what":what,
                #     "where":where
                # })
            else:
                for key in what.copy():
                    if what[key] == None:
                        del what[key]
                        
                self.mongodb.dealers_collection.update_one(where,{"$set":what})
                what["_id"] = result["_id"]
                # self.csv_parser_mysql.produce_message({
                #     "table":"market_check_dealers",
                #     "what":what,
                #     "where":where
                # })
            
    
    def upsert_listings(self,listings):
        
        tmp = []
        
        active_dealer_ids = self.get_active_dealer_ids()
        
        for listing in listings:
            dealer_id = listing["raw"].get("dealer_id",None)
            
            what = listing
            
            where = {"raw.registration":listing["raw"]["registration"]}
            
            if len(listing["raw"]["images"]) <= 2:
                self.mongodb.listings_collection.delete_one(where)
                continue
            
            result = self.mongodb.listings_collection.find_one(where)
        
            what["updated_at"] = get_current_datetime()
            
            id = None
            
            
            if result == None:
                what["created_at"] = get_current_datetime()
                
                id = generate_unique_uuid()
                
                what["_id"] = id
                what["status"] = "inactive"
                
                self.mongodb.listings_collection.insert_one(what)
                
            else:
                
                self.mongodb.listings_collection.update_one(where,{"$set":what})
                
                id = result["_id"]
                what["_id"] = id
          
            
            # if dealer_id in active_dealer_ids:
            #     tmp.append({
            #         "listing_id":id,
            #         "data":listing
            #     })
        
        return tmp
    
    def main(self):
        for file in self.new_files_dir.glob("*.csv.gz"):
            
            if file.is_dir() == True:
                print(f'skipping : it is directory : {str(file)}')
                continue
            
            listings,dealers = self.parse_csv(file)
            
            dest_file = self.processed_files_dir.joinpath(file.name)
            
            # self.move_file(str(file),str(dest_file))
            
            return True,listings,dealers

        return False,None,None