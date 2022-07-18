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
                response = requests.post(url,headers=self.headers)
                # print(response.status_code)
                json_response = response.json()
                # print(json_response)
                break
            except Exception as e:
                print(f'error : {str(e)}')
        return json_response
    
    def parse_classification_response(self,json_response):
        status = False
        image_class = None
        image_class_confidence = None
        image_angle = None
        image_angle_confidence= None
        try:
            image_class = json_response["data"]["type"]["value"]
            image_class_confidence = json_response["data"]["type"]["confidence"]

            image_angle = json_response["data"]["angle"]["value"]
            image_angle_confidence = json_response["data"]["angle"]["confidence"]
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
        # time.sleep(5)
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
                print(json_response)
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
        
        for i in range(0,40):
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                json_response = response.json()
                if json_response["sku_status"] != 'Done':
                    time.sleep(5)
                    print(f'sleeping for 5 sec...')
                    continue
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



# if __name__ == "__main__":
    
#     sai = SpyneAi()
    
#     test_images = [
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-cfa5c95add2ae3c95d0a0fc3cb62d487224d05bd.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-f8cfc0afbea688e7fb6653113412bac3483cc064.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-2b21218248d1848780bedd9ee84a66cd06419487.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-5596776a84809502bd20c54068818227848f8fee.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-e402781785892f78b80e4f469fb14bbff4477454.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-7f6344d9ad5bc5cf799d0e3558e5f8a72f935149.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-ffacae4696933b455ede93fc09b189b314f7a842.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-f1f7d5889a7d0a509cd29e24e7a81a959d0f1758.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-223483e40092c6585ce53e7502c939d9c549ddec.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-36661413d695dc156ee15cbcd9d741b6bc377ad3.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-b3a063826692d8dee3f99752add4c0b618758b89.jpg?width=1200&quality=80"
#     },
#     {
#       "url": "https://bluesky.cdn.imgeng.in/cogstock-images/cit-301df17d2dd256552da7de4d57a0e2b9f3cb7d09.jpg?width=1200&quality=80"
#     }
#     ]
    
#     imgs = [i["url"] for i in test_images]
    
#     bg_rm = sai.remove_background(imgs,"xyzddkfn")
    
#     for img in bg_rm:
#         print(img)
#         print("--------------------")
    
    # for img in test_images:
    #     classification = sai.classify_image(img["url"])
    #     print(f'url : {img["url"]}')
    #     print(classification)
        
    #     print("------------------------------------------------------")
        
    #     break
    



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