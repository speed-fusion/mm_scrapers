
from flask import Flask, jsonify, send_from_directory,request
from flask_cors import CORS

from pathlib import Path

import sys 
sys.path.append("/libs")

from mongo_database import MongoDatabase

db = MongoDatabase() 

app = Flask(__name__)

CORS(app)



# listing
@app.route('/listings')
def listings():
    pass

@app.route('/listings/distinct/<key>')
def search_meta(key):
    resp = {
        "status":False,
        "data":[]
    }
    data = db.listings_collection.distinct(key)
    
    resp["data"] = data
    resp["status"] = True
    
    return jsonify(resp)

@app.route('/listings/filter/<page>')
def search_meta(page):
    if page == None:
        page = 0
    
    per_page = 20
    
    skip = page * per_page
    
    limit = per_page
    
    json_data = request.get_json()
    
    where = json_data["where"]
    
    what = json_data["what"]
    
    what_distinct = None
    if what != None:
        what_distinct = db.listings_collection.distinct(what,where)
    
    total = db.listings_collection.count_documents(where)
    
    listings = list(db.listings_collection.find(where).skip(skip).limit(limit))
    
    total_pages = int(total/per_page)
    
    current_page = page
    
    return(jsonify({
        "status":True,
        "data":{
            "listings":listings,
            "total_listings":total,
            "total_pages":total_pages,
            "current_page":current_page,
            "what_distinct":what_distinct
        }
    }))


# 1. select make
# 2. select model
# 3. select trim



# dealers
@app.route('/dealers')
def dealers():
    pass





@app.route('/<path:path>')
def download_file(path):
    print(path)
    return send_from_directory(media_base_path,path)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0",port=6001,debug=True)