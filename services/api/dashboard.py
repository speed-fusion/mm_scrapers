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
    
    body = request.get_json()
    
    what = body["what"]
    where = body["where"]
    
    data = list(mongo_db.listings_collection.find(where,what))
    
    return jsonify({"status":200,"data":data})