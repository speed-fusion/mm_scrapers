from pathlib import Path
import time
import requests
from car_cutter_helper import load_images,generate_sha1_hash
from concurrent.futures import ThreadPoolExecutor,as_completed
from helper import get_current_datetime

import os

class CarCutter:
    def __init__(self) -> None:
        self.api_key = os.environ.get("CAR_CUTTER_KEY")
        
        self.cwd = Path.cwd()
        
        self.background_remove_angles = [
            "exterior_front-left",
            "exterior_front-right",
            "exterior_rear-right",
            "exterior_rear-left"
        ]
        
        self.processed_image_dir = self.cwd.joinpath("processed-images")
        
        if not self.processed_image_dir.exists():
            self.processed_image_dir.mkdir()
        
        self.raw_images = self.cwd.joinpath("raw-images")
        
        if not self.raw_images.exists():
            self.raw_images.mkdir()
            
        self.max_retry = 20
        
        self.max_exterior = 6
        
        self.max_interior = 10
        
        self.media = self.cwd.joinpath("/media")
    
    
    def submit_images(self,images):
        
        url = "https://api.car-cutter.com/vehicle/image/submission"
        
        payload={'image_url': images}
                
        headers = {
        'Authorization': f'Bearer {self.api_key}'
        }

        json_response = None
        
        for i in range(0,self.max_retry):
            try:
                response = requests.request("POST", url, headers=headers, data=payload)
                if response.status_code == 200:
                    json_response = response.json()
                    json_response["data"]["images"]
                    break
            except:
                pass
        
        if json_response == None:
            json_response = {"data":{"images":[]}}
        
        
        all_images = []
        unique_angles_found = {}
        exterior = []
        interior = []
        all_angles_count = 0
        image_logs = []
        
        for item in json_response["data"]["images"]:
            url = item["image"]
            id = generate_sha1_hash(url)
            
            if item["quality"] != 'ok':
                print(f'the quality is not ok : {url}')
                continue
            
            angle = "_".join(item["angle"]).lower()
            
            img_item = {
                "id":id,
                "car_cutter_class":angle,
            }
            
            if "exterior" in angle:
                if angle in unique_angles_found:
                    all_angles_count += 1
                    img_item["url"] = url
                    img_item["status"] = "skipped"
                    img_item["reason"] = "duplicate angle"
                    image_logs.append(img_item)
                    continue
                
                if len(exterior) <= self.max_exterior:
                    if angle in self.background_remove_angles:
                        if "front" in angle:
                            unique_angles_found[angle] = 1
                            img_item["car_cutter_ready"] = False
                            img_item["car_cutter_downloaded"] = False
                            exterior.insert(0,img_item)
                            img_item["status"] = "added"
                            img_item["url"] = url
                            image_logs.append(img_item)
                            all_angles_count += 1
                            
                        elif "rear" in angle:
                            unique_angles_found[angle] = 1
                            img_item["car_cutter_ready"] = False
                            img_item["car_cutter_downloaded"] = False
                            exterior.append(img_item)
                            img_item["status"] = "added"
                            img_item["url"] = url
                            image_logs.append(img_item)
                            all_angles_count += 1
                    else:
                        print(f'angle is not in required angles : {angle}')
                        img_item["status"] = "skipped"
                        img_item["reason"] = "invalid angle"
                        img_item["url"] = url
                        image_logs.append(img_item)
                else:
                    img_item["status"] = "skipped"
                    img_item["reason"] = "max exterior limit reached."
                    img_item["url"] = url
                    image_logs.append(img_item)
                    
            elif "interior" in angle:
                if len(interior) <= self.max_interior:
                    img_item["car_cutter_ready"] = True
                    img_item["car_cutter_downloaded"] = True
                    interior.append(img_item)
                    img_item["status"] = "added"
                    img_item["url"] = url
                    image_logs.append(img_item)
                else:
                    img_item["status"] = "skipped"
                    img_item["reason"] = "max interior limit reached."
                    img_item["url"] = url
                    image_logs.append(img_item)
                    print(f'skipping : maximum limit reached : {url}')
                    continue
            else:
                img_item["status"] = "skipped"
                img_item["reason"] = "image class is unknown."
                img_item["url"] = url
                image_logs.append(img_item)
                print(f'image class is unknown : {angle}')
        
        index = 0
        
        for img in exterior:
            img["position"] = index
            index += 1
            all_images.append(img)
        
        for img in interior:
            img["position"] = index
            index += 1
            all_images.append(img)
            
        return len(unique_angles_found),all_images,image_logs,all_angles_count
    
    def generate_query_param(self,key,images):
        q = ""
        
        for i in images:
            if i != None:
                q += f'{key}={i}&'
        return q.strip("&")
    
    def check_status(self,images):
        
        query_param = self.generate_query_param("image_url",images)
        
        url = f'https://api.car-cutter.com/vehicle/image/status?{query_param}'
        
        headers = {
        'Authorization': f'Bearer {self.api_key}'
        }
        json_response = None
        
        for i in range(0,self.max_retry):
            try:
                response = requests.request("GET", url, headers=headers)
                json_response = response.json()
                json_response = json_response["data"]["images"][0]
                break
            except:
                pass
        
        return json_response
    
    def save_image(self,content,path):
        
        file_path = Path(path)
        
        if file_path.exists() == True:
            print(f'deleted existing file')
            file_path.unlink()
        
        time.sleep(1)
        
        with open(file_path,"wb") as f:
            f.write(content)
        
    
    def get_result(self,image_url,file_path,item):
        status = False
        url = f'https://api.car-cutter.com/vehicle/image/result?image_url={image_url}'
        
        headers = {
        'Authorization': f'Bearer {self.api_key}'
        }
        
        for i in range(0,self.max_retry):
            response = requests.request("GET", url, headers=headers)
            if response.status_code == 200:
                self.save_image(response.content,file_path)
                print(f'downloaded : {file_path}')
                status = True
                break
            time.sleep(1)
            
        return status,item
        
    # def generate_image_id_path(self,images,websiteId,listingId):
    #     data = []
        
    #     for img in images:
    #         id = generate_sha1_hash(img)

    def download_multiple_images(self,urls):
        
        downloadedImages = []
        
        threads = []
        
        with ThreadPoolExecutor(max_workers=30) as executor:
            for position,item in enumerate(urls):
                
                if item["car_cutter_downloaded"] == True:
                    downloadedImages.append(item)
                    continue
                
                threads.append(executor.submit(self.get_result,item["mm_img_url"],item["path"],item))
        
            for task in as_completed(threads):
                status,data = task.result()
                
                if status == True:
                    data["car_cutter_downloaded"] = True
                    downloadedImages.append(data)
                else:
                    print(f'car cutter image download failed.')
                    print(data)
                
        return downloadedImages
    
    # def process_images(self,car_cutter_images,websiteId,listingId):
    #     interior = []
    #     exterior = []
    #     images = []
        
    #     website_dir = self.media.joinpath(f'{websiteId}')
        
    #     if not website_dir.exists():
    #         website_dir.mkdir()
        
    #     listing_dir = website_dir.joinpath(str(listingId))
        
    #     if not listing_dir.exists():
    #         listing_dir.mkdir()
        
    #     # car_cutter_images = []
        
    #     # for image in images:
    #     #     all_images_by_id[image["id"]] = image
    #     #     car_cutter_images.append(image["url"])
        
    #     processed_images = []
    #     result = self.submit_images(car_cutter_images)
    #     time.sleep(2)
    #     index = 0
    #     cc_total_img = 0
    #     unique_angles_found = {}
    #     for item in result["data"]["images"]:
    #         if item["quality"] != 'ok':
    #             continue
            
    #         img_item = {}
    #         url = item["image"]
    #         angle = "_".join(item["angle"]).lower()
    #         id = generate_sha1_hash(url)
    #         file_name = f'{id}.png'
    #         file_path = listing_dir.joinpath(file_name)
    #         img_item["id"] = id
    #         img_item["angle"] = angle
    #         img_item["url"] = url
    #         img_item["path"] = str(file_path)
    #         img_item["cc_status"] = 0
            
    #         if "exterior" in angle:
    #             if angle in self.background_remove_angles:
    #                 if "front" in angle:
    #                     img_item["cc_status"] = 1
    #                     unique_angles_found[angle] = 1
    #                     cc_total_img += 1
    #                     images.append(url)
    #                     exterior.insert(0,img_item)
    #                 elif "rear" in angle:
    #                     img_item["cc_status"] = 1
    #                     unique_angles_found[angle] = 1
    #                     cc_total_img += 1
    #                     images.append(url)
    #                     exterior.append(img_item)
    #             else:
    #                 pass
    #         elif "interior" in angle:
    #             if len(interior) <= self.max_images - 4:
    #                 images.append(url)
    #                 interior.append(img_item)
                    
    #     index = 0
    #     for i in exterior:
    #         tmp = i.copy()
    #         tmp["position"] = index
    #         processed_images.append(tmp)
    #         index += 1
    #         print(i)
        
    #     processed_images = self.download_multiple_images(processed_images)
        
    #     for i in interior:
    #         tmp = i.copy()
    #         tmp["position"] = index
    #         processed_images.append(tmp)
    #         index += 1
    #         print(i)
    #     return processed_images,len(unique_angles_found)


# if __name__ == "__main__":
#     cc = CarCutter()
#     images = load_images()
#     # for i in images:
#     #     print(f'image_url:{i}')
#     for i in cc.process_images(images):
#         print(i)