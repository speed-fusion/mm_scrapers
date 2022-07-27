
import uuid
from flask import Flask, jsonify,request,send_file
from flask_cors import CORS
import requests
from pathlib import Path
from io import BytesIO
import sys

sys.path.append("/libs")
from helper import get_current_datetime 

from mongo_database import MongoDatabase

from mysql_database import MysqlDatabase

from pulsar_manager import PulsarManager

pm = PulsarManager()

db = MongoDatabase()

mysql_db = MysqlDatabase()

app = Flask(__name__)

CORS(app)

@app.route('/listings/add',methods=["POST"])
def add_listings():
    
    json_data = request.get_json()
    
    registration = json_data.get("registration","").strip().upper()
    
    listing_id = json_data.get("listing_id")
    
    if len(registration) == 0:
        return {
            "status":False,
            "message":f'The registration is invalid : {registration}'
        }
    
    mysql_db.connect()
    resp = mysql_db.recCustomQuery(f'SELECT registration,mm_product_url,ID FROM fl_listings WHERE registration="{registration}"')
    mysql_db.disconnect()
    
    if len(resp) == 0:
        
        now = get_current_datetime()
        
        db.manual_entry_collection.insert_one({
            "listing_id":listing_id,
            "created_at":now,
            "updated_at":now,
            "status":"processing",
            "message":""
        })
        
        message = {
                "listing_id":listing_id,
                "website_id":18,
                "data":None
            }
        
        producer = pm.create_producer(pm.topics.MANUAL_TRANSFORM)
        
        producer.produce_message(message)
        
        return jsonify({
            "status":True,
            "message":"listing added in queue."
        })
    else:
        return jsonify({
            "status":False,
            "message":f'listing already available on site : {resp[0]["ID"]}'
        })

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
        "raw":1,
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
    
    db_listings = list(db.listings_collection.find(where,required_columns).skip(skip).limit(limit))
    
    listings = []
    
    for l in db_listings:
        tmp = {}
        
        main_img = None
        for img in l["raw"]["images"]:
            main_img = img["url"]
            break
        tmp["main_img"] = main_img
        tmp.update(l["raw"])
        tmp["listing_id"] = l["_id"]
        del tmp["images"]
        listings.append(tmp)
        
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
    url = request.args.get("url")
    resp = requests.get(url,headers=headers)
    return send_file(
    BytesIO(resp.content),
    mimetype='image/jpeg',
    as_attachment=False,
    download_name=f'{uuid.uuid4()}.jpg')
    
    

# dealers
@app.route('/dealers')
def dealers():
    pass

# if __name__ == "__main__":
#     app.run(host="0.0.0.0",port=6001,debug=True)