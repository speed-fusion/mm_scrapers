from crypt import methods
from flask import Blueprint, abort,jsonify,request,send_file
import sys
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

Dashboard = Blueprint('dashboard', __name__,url_prefix="/dashboard")

from pathlib import Path

tmp_dir = Path("/tmp")



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

def serve_pil_image(pil_img):
    img_io = StringIO()
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')

@Dashboard.route('/resize',methods=["GET"])
def resize():
    height = int(request.args.get("height",150))
    width = int(request.args.get("width",150))
    url = request.args.get("url",None)
    
    if url == None:
        return abort(404)
    
    response = requests.get(url,headers=headers)
    
    im = Image.open(StringIO(response.content))
    
    im = im.resize((width,height))
    
    im =  im.convert('RGB')
    
    return serve_pil_image(im)
    
    
    
    