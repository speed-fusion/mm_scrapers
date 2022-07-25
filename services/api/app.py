
from crypt import methods
from flask import Flask, jsonify, send_from_directory,request
from flask_cors import CORS

from pathlib import Path

import sys 
sys.path.append("/libs")

from mongo_database import MongoDatabase

db = MongoDatabase() 

app = Flask(__name__)

CORS(app)

@app.route('/listings/filter/<page>',methods=["POST"])
def search_meta(page):
    if page == None:
        page = 0
    
    per_page = 20
    
    skip = int(page) * per_page
    
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
    
    current_page = int(page)
    
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

# if __name__ == "__main__":
#     app.run(host="0.0.0.0",port=6001,debug=True)