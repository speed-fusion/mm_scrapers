from pathlib import Path
from number_plate_predictor import NumberPlatePredictor
from plate_recognizer_api import PlateRecognizerApi
import shutil


class RegistrationPredictor:
    def __init__(self) -> None:
        self.predictor = NumberPlatePredictor()
        self.pathPrefix = Path('/usr/src/app/files')
        self.PlateRecognizer = PlateRecognizerApi()
        self.deep_learning_dir = Path("/usr/src/app/deep_learning")
    
    def validateRegistration(self,predicted,actual):
        regNo = str(predicted).strip().upper()
        
        print(f'actual : {actual}')
        print(f'predicted : {regNo}')
        
        print(f'{actual[-2:-1]}')
        
        if len(regNo) != 7:
            return False,regNo
        
        if actual == None:
            return True,regNo
        
        if not regNo.startswith(actual[0]):
            return False,regNo
        
        if not regNo.endswith(actual[len(regNo) - 2 : len(regNo)]):
            return False,regNo
        
        return True,regNo


    def generate_file_name(self,box,id):
        file_name = f'{id}_{box["xmin"]}_{box["ymin"]}_{box["xmax"]}_{box["ymax"]}.jpg'
        return file_name
    
    def handle_deep_learning(self,box,id,imgPath):
        try:
            filename = self.generate_file_name(box,id)
            filepath = self.deep_learning_dir.joinpath(filename)
            # imgPath.copy(filepath)
            shutil.copy(str(imgPath),str(filepath))
        except Exception as e:
            print(str(e))
    
    def predict(self,images,rawRegistration):
        
        registration = None
        
        status = False
        
        for image in images:
            
            imgPath = Path(image["path"])
            
            if imgPath.exists() == False:
                continue
            
            isNumberPlateVisible = self.predictor.predict(imgPath)
            
            if isNumberPlateVisible == False:
                continue
            
            
            with open(imgPath,"rb") as f:
                result = self.PlateRecognizer.fetchRegistrationNumber(f)

            if result["status"] == False:
                continue
            
            status,regno = self.validateRegistration(result["registration"],rawRegistration)
            
            if status == True:
                try:
                    self.handle_deep_learning(result["box"],image["id"],imgPath)
                except Exception as e:
                    print(f'error : {str(e)}')
                
                registration = regno
                
                break
            else:
                registration = regno
                
        return {
            "predicted_registration":registration,
            "correct_registration":status
        }
