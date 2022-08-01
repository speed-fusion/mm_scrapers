from crypt import methods
from datetime import datetime
from flask import Blueprint, abort,jsonify,request,send_file, send_from_directory,Response
import sys
import pymongo
import requests
from PIL import Image
from io import StringIO,BytesIO

sys.path.append("/libs")

from helper import get_current_datetime,generate_sha1

from mongo_database import MongoDatabase

from mysql_database import MysqlDatabase

from pulsar_manager import PulsarManager

headers =   {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'}

mongo_db = MongoDatabase()

mysql_db = MysqlDatabase()

Dashboard = Blueprint('dashboard', __name__,url_prefix="/dashboard")

from pathlib import Path

tmp_dir = Path("/tmp")

pm = PulsarManager()

import json


@Dashboard.route('/dropdown',methods=["POST"])
def dropdown():
    
    body = request.get_json()
    
    what = body["what"]
    where = body["where"]
    
    data = list(mongo_db.dropdown_collection.distinct(what,where))
    
    response = Response(
        response=json.dumps({"status":200,"data":data}),
        status=200,
        mimetype='application/json'
    )
    return response

@Dashboard.route('/listings',methods=["POST"])
def listings():
    per_page = 10
    
    body = request.get_json()
    
    what = body["what"]
    where = body["where"]
    page = body["page"]
    
    where["status"] = "inactive"
    
    skip = per_page * page
    
    listing_count = mongo_db.listings_collection.count_documents(where)
    
    page_count = int(listing_count/per_page)
    
    data = list(mongo_db.listings_collection.find(where,what).sort("raw.price").skip(skip).limit(per_page))
    
    response = Response(
        response=json.dumps({"status":200,"listing_count":listing_count,"page_count":page_count,"per_page":per_page,"data":data}),
        status=200,
        mimetype='application/json'
    )
    return response

@Dashboard.route('/suggestion',methods=["POST"])
def suggestion():
    body = request.get_json()
    
    what = body["what"]
    where = body["where"]
    limit = body["limit"]
    
    where["status"] = "inactive"
    
    data = list(mongo_db.listings_collection.find(where,what).limit(limit))
    
    response = Response(
        response=json.dumps({"status":200,"data":data}),
        status=200,
        mimetype='application/json'
    )
    return response

@Dashboard.route('/recently-added',methods=["POST"])
def recently_added():
    per_page = 10
    
    body = request.get_json()
    
    page = body["page"]
    
    skip = per_page * page
    
    listing_count = mongo_db.recent_listings_collection.count_documents({})
    
    page_count = int(listing_count/per_page)
    
    data = list(mongo_db.recent_listings_collection.find({}).sort("created_at",pymongo.DESCENDING).skip(skip).limit(per_page))
    
    for item in data:
        tmp = mongo_db.listings_collection.find_one({"_id":item["listing_id"]},{"raw":1,"margin":1,"mm_price":1,"mm_url":1,"ltv_percentage":1,"source_mrp":1})
        
        if tmp == None:
            continue
        
        item.update(tmp)
    
    response = Response(
        response=json.dumps({"status":200,"listing_count":listing_count,"page_count":page_count,"per_page":per_page,"data":data},default=str),
        status=200,
        mimetype='application/json'
    )
    return response





@Dashboard.route('/resize',methods=["GET"])
def resize():
    height = int(request.args.get("height",150))
    width = int(request.args.get("width",150))
    url = request.args.get("url",None)
    
    if url == None:
        return abort(404)
    
    file_name = f'{generate_sha1(url)}_{height}_{width}.jpg'
    
    file_path = tmp_dir.joinpath(file_name)
    
    if file_path.exists() == True:
        return send_from_directory(str(tmp_dir),file_path.name)
    
    
    response = requests.get(url,headers=headers)
    
    im = Image.open(BytesIO(response.content))
    
    # im = im.resize((width,height))
    
    im =  im.convert('RGB')
    
    im.save(str(file_path),quality=25)
    
    return send_from_directory(str(tmp_dir),file_path.name)

@Dashboard.route('/add-to-mm',methods=["GET"])
def add_to_mm():
    
    id = request.args.get("id")
    
    registration = request.args.get("registration")
    
    mysql_db.connect()
    
    message = None
    
    try:
        
        result = mysql_db.recCustomQuery(f'SELECT ID,Status,mm_product_url FROM fl_listings WHERE registration="{registration}"')
        
        if len(result) > 0:
            
            if result[0]["Status"] in ["active","manual_expire","to_parse","pending"]:
                message = f'listing already present in database. reference number : {result[0]["ID"]}, status : {result[0]["Status"]}'
            return jsonify({"status":False,"message":message})
        else:
            data = {
                "listing_id":id,
                "website_id":18,
            }
            
            publisher = pm.create_producer(pm.topics.MANUAL_TRANSFORM)
            
            publisher.produce_message(data)
            
            message = "listing added in queue."
            
            listing_data = mongo_db.listings_collection.find_one({"_id":id},{"raw":1,"_id":0})
            
            recent = {
                "listing_id":id,
                "status":"to_parse",
                "created_at":get_current_datetime()
            }
            
            if listing_data != None:
                recent.update(listing_data)
            
            mongo_db.recent_listings_collection.insert_one(recent)
            
            return jsonify({"status":True,"data":data,"message":message})
        
    except Exception as e:
        print(f'error : {str(e)}')
        message = str(e)
    
    mysql_db.disconnect()
    
    return jsonify({"status":False,"message":message})