from crypt import methods
from flask import Blueprint,jsonify,request
import sys


sys.path.append("/libs")
from helper import get_current_datetime 

from mongo_database import MongoDatabase

from mysql_database import MysqlDatabase

from pulsar_manager import PulsarManager


mongo_db = MongoDatabase()

Dashboard = Blueprint('dashboard', __name__,url_prefix="/dashboard")

@Dashboard.route('/dropdown',methods=["POST"])
def dropdown():
    
    body = request.get_json()
    
    what = body["what"]
    where = body["where"]
    
    data = list(mongo_db.dropdown_collection.distinct(what,where))
    
    return jsonify({"status":200,"data":data})

@Dashboard.route('/listings',methods=["POST"])
def listings():
    per_page = 10
    
    body = request.get_json()
    
    what = body["what"]
    where = body["where"]
    page = body["page"]
    
    skip = per_page * page
    
    listing_count = mongo_db.listings_collection.count_documents(where)
    
    page_count = int(listing_count/per_page)
    
    data = list(mongo_db.listings_collection.find(where,what).skip(skip).limit(per_page))
    
    return jsonify({"status":200,"listing_count":listing_count,"page_count":page_count,"per_page":per_page,"data":data})