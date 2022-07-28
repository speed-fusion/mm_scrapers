from enum import Enum
import os

PIPELINE_NAME = "." + os.environ.get("PIPELINE_NAME","default")

MONGO_HOST = os.environ.get("MONGO_HOST")
MONGO_USERNAME = os.environ.get("MONGO_INITDB_ROOT_USERNAME")
MONGO_PASSWORD = os.environ.get("MONGO_INITDB_ROOT_PASSWORD")
MONGO_DATABASE = os.environ.get("MONGO_DATABASE")

MYSQL_HOST = os.environ.get("MYSQL_HOST")
MYSQL_PORT = int(os.environ.get("MYSQL_PORT"))
MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
MYSQL_USERNAME = os.environ.get("MYSQL_USERNAME")
MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE")


PULSAR_HOST = os.environ.get("PULSAR_HOST")

REDIS_HOST = os.environ.get("REDIS_HOST")
REDIS_PORT = int(os.environ.get("REDIS_PORT"))

class ListingCountTypes(Enum):
    NEW_LISTING_COUNT = "new_listing_count"

class AutoTraderConstants(Enum):
    WEBSITE_ID = 17
    ACCOUNT_ID = 24898
    PLAN_ID = 26
    FEATURED_ID = 26
    PRIORITY = 109

class MarketCheckConstants(Enum):
    WEBSITE_ID = 18
    ACCOUNT_ID = 24898
    PLAN_ID = 26
    FEATURED_ID = 26
    PRIORITY = 109

class Topics(Enum):
    LOGS = "motormarket.scraper.logs"
    
    FL_LISTINGS_UPDATE = f'motormarket{PIPELINE_NAME}.database.fllistings.update'
    
    FL_LISTINGS_INSERT = f'motormarket{PIPELINE_NAME}.database.fllistings.insert'
    
    LISTINGS_UPSERT_PROD_DB = f'motormarket{PIPELINE_NAME}.database.production.insert'
    
    FL_LISTINGS_FIND = f'motormarket{PIPELINE_NAME}.database.fllistings.find'
    
    LISTING_TRANSFORM = f'motormarket{PIPELINE_NAME}.scraper.listing.transform'
    
    MANUAL_TRANSFORM = f'motormarket.manual.scraper.listing.transform'
    
    LISTING_PRE_VALIDATION = f'motormarket{PIPELINE_NAME}.scraper.listing.prevalidation'
    
    LISTING_POST_VALIDATION = f'motormarket{PIPELINE_NAME}.scraper.listing.postvalidation'
    
    LISTING_POST_CALCULATION= f'motormarket{PIPELINE_NAME}.scraper.listing.postcalculation'
    
    LISTING_PREDICT_MAKE_MODEL= f'motormarket{PIPELINE_NAME}.scraper.listing.predict.makemodel'
    
    LISTING_PREDICT_NUMBERPLATE= f'motormarket{PIPELINE_NAME}.scraper.listing.predict.numberplate'
    
    LISTING_PREDICT_SEAT= f'motormarket{PIPELINE_NAME}.scraper.listing.predict.seat'
    
    CLASSIFY_IMAGE= f'motormarket{PIPELINE_NAME}.scraper.listing.predict.car.image'
    
    DOWNLOAD_IMAGE= f'motormarket{PIPELINE_NAME}.scraper.listing.download.image'
    
    FL_LISTING_PHOTOS_INSERT = f'motormarket{PIPELINE_NAME}.database.fllistingphotos.insert'
    
    AT_URLS_UPDATE = 'motormarket.database.aturls.update'
    
    GENERATE_IMAGE = f'motormarket{PIPELINE_NAME}.listing.generate.image'
    
    CAR_CUTTER = f'motormarket{PIPELINE_NAME}.listing.replace.background.image'
    
    CAR_CUTTER_SUBMIT = f'motormarket{PIPELINE_NAME}.listing.car.cutter.submit'
    
    CAR_CUTTER_STATUS_CHECK = f'motormarket{PIPELINE_NAME}.listing.car.cutter.status.check'
    
    CAR_CUTTER_DOWNLOADER = f'motormarket{PIPELINE_NAME}.listing.car.cutter.downloader'
    
    SPYNE_AI = f'motormarket{PIPELINE_NAME}.listing.spyne.ai'
    
    AUTOTRADER_LISTING_SCRAPER = f'motormarket{PIPELINE_NAME}.scraper.autotrader.listing.scrape'
    
    CSV_PARSER_MYSQL = f'motormarket{PIPELINE_NAME}.scraper.market.check.csv.parser.mysql'
    