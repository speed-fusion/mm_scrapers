
import uuid
from flask import Flask, jsonify, send_from_directory,request,send_file
from flask_cors import CORS
import requests
from pathlib import Path

import sys 
sys.path.append("/libs")

from mongo_database import MongoDatabase

db = MongoDatabase() 

app = Flask(__name__)

CORS(app)

@app.route('/listings/unique',methods=["POST"])
def unique_values():
    json_data = request.get_json()
    
    where = json_data["where"]
    
    what = json_data["what"]
    
    what_distinct = db.listings_collection.distinct(what,where)
    
    return jsonify({
        "status":True,
        "data":what_distinct
    })

@app.route('/listings/filter',methods=["POST"])
def search_meta():
    required_columns = {
        "predicted_make":1,
        "predicted_model":1,
        "mm_price":1,
        "source_price":1,
        "admin_fee":1,
        "title":1,
        "source_url":1,
        "mm_url":1,
        "mileage":1,
        "engine_cylinders_cc":1,
        "fuel":1,
        "dealer_name":1,
        "dealer_number":1,
        "dealer_id":1,
        "body_style":1,
        "transmission":1,
        "trim":1,
        "mm_url":1,
        "status":1,
        "margin":1,
        "images":1,
        "write_off_category":1
    }
    page = int(request.args.get("page",0))
    if page == None:
        page = 0
    
    per_page = 20
    
    skip = page * per_page
    
    limit = per_page
    
    json_data = request.get_json()
    
    where = json_data["where"]
    
    total = db.listings_collection.count_documents(where)
    
    listings = list(db.listings_collection.find(where,required_columns).skip(skip).limit(limit))
    
    total_pages = int(total/per_page)
    
    current_page = page
    
    return(jsonify({
        "status":True,
        "data":{
            "listings":listings,
            "total_listings":total,
            "total_pages":total_pages,
            "current_page":current_page,
        }
    }))


# 1. select make
# 2. select model
# 3. select trim

# dealers
@app.route('/fetch/image')
def image_downloader():
    headers =   {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'}
    url = request.args.get("url",headers=headers)
    resp = requests.get(url)
    return send_file(
    resp.content,
    mimetype='image/jpeg',
    as_attachment=True,
    download_name=f'{uuid.uuid4()}.jpg')
    
    

# dealers
@app.route('/dealers')
def dealers():
    pass

# if __name__ == "__main__":
#     app.run(host="0.0.0.0",port=6001,debug=True)