import requests

from helper import generate_sha1

import os

import time

class SpyneAi:
    def __init__(self):
        self.classification_base_url = "https://www.clippr.ai/api/pv1/image-validation"
        self.auth_key = os.environ.get("SPYNE_AI_API_KEY")
        self.max_retry = 5
        self.headers = {"Accept": "application/json"}
    
    def submit_classify_request(self,image_url):
        url = f'{self.classification_base_url}?auth_key={self.auth_key}&image_url={image_url}&category=Automobile&angle_detection=true&sub_category_detection=false&crop_detection=false'
        json_response = None
        for i in range(0,self.max_retry):
            if json_response != None:
                continue
            try:
                response = requests.get(url,headers=self.headers)
                json_response = response.json()
                break
            except Exception as e:
                print(f'error : {str(e)}')
        return json_response
    
    def parse_classification_response(self,json_response):
        status = False
        try:
            image_class = json_response["data"]["type"]["value"]
            image_class_confidence = json_response["data"]["type"]["confidence"]

            image_angle = json_response["data"]["angle"]["value"]
            image_angle_confidence = json_response["data"]["type"]["confidence"]
            status = True
        except Exception as e:
            print(f'error : {str(e)}')
        return {
            "status":status,
            "image_class":image_class,
            "image_class_confidence":image_class_confidence,
            "image_angle":image_angle,
            "image_angle_confidence":image_angle_confidence
        }
    
    def classify_image(self,image_url):
        response = self.submit_classify_request(image_url)
        return self.parse_classification_response(response)
    
    def remove_background(self,image_items,listing_id):
        response = self.submit_bg_remove_request(image_items,listing_id)
        parsed_response = self.parse_bg_remove_response(response)
        result = self.get_bg_remove_result(parsed_response["sku_id"])
        return result
    
    def submit_bg_remove_request(self,image_items,listing_id):
        
        url = "https://www.clippr.ai/api/pv1/image/replace-bg"

        payload = {
            "sku_name":listing_id,
            "category_id": "Automobile",
            "image_data": [
                {
                    "category": "Exterior",
                    "image_urls": image_items,
                }
            ],
            "background_type": "legacy",
            "background": "46376",
            "number_plate_logo": "1",
            "auth_key": self.auth_key
        }
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        json_response = None
        
        for i in range(0,self.max_retry):
            try:
                response = requests.post(url, json=payload, headers=headers)
                json_response = response.json()
                break
            except Exception as e:
                print(f'error : {str(e)}')
        return json_response

    def parse_bg_remove_response(self,json_response):
        sku_id = None
        message = None
        status = False
        try:
            sku_id = json_response["data"]["sku_id"]
            message = json_response["message"]
            status = True
        except Exception as e:
            print(f'error : {str(e)}')
        return {
            "status":status,
            "sku_id":sku_id,
            "message":message
        }
    
    def submit_bg_remove_result_request(self,sku_id):
        
        url = f'https://www.clippr.ai/api/v2/sku/get-ready-images?auth_key={self.auth_key}&sku_id={sku_id}'

        headers = {"Accept": "application/json"}

        json_response = None
        
        for i in range(0,self.max_retry):
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                json_response = response.json()
                break
            else:
                time.sleep(1)
            
        return json_response
        
    def parse_bg_remove_result_response(self,json_response):
        images = []
        
        if json_response["sku_status"] == "Done":
            
            for img in json_response["image_data"]:
                tmp = {}
                url = img["input_image"]
                tmp["url"] = url
                if img["status"] != "Done":
                    tmp["status"] = False
                    images.append(tmp)
                    continue
                
                tmp["download_url"] = img["output_image"]
                tmp["status"] = True
                
                images.append(tmp)
        
        return images
        
    def get_bg_remove_result(self,sku_id):
        response = self.submit_bg_remove_result_request(sku_id)
        return self.parse_bg_remove_result_response(response)


# {
#   "sku_status": "Done",
#   "image_data": [
#     {
#       "sku_name": "test_sku",
#       "user_id": "QePya99V",
#       "project_id": "a03a62c1",
#       "sku_id": "27242403",
#       "image_id": "img-9b1f0f25-227e-448e-bac1-aed95925fc73",
#       "image_name": "b9929b03-27cd-4ad9-a4a1-7d50c3481fb1",
#       "frame_no": "1",
#       "input_image": "https://media.motor.market/files/S18/ad3354295/org_38f89aeb9fc97fd5e183c6539caa82d6ebe4c724.jpg",
#       "output_image": "https://spyne.s3.amazonaws.com/AI/app/edited/car_replace_bg_3cb55593-65a6-4385-aa2a-d10d6d831d45.jpg",
#       "lowres_output": "https://spyne.s3.amazonaws.com/LCGLKTH15/a03a62c1/27242403/resize_thumb_img_input_d671e2eb-a8b1-46a5-a3b4-94142392197b.png",
#       "background_id": "46376",
#       "status": "Done"
#     }
#   ]
# }