from fastai.vision import *

class ImageClassifier:
    def __init__(self):
        print("image predictor init")
        self.model = load_learner('model')
    
    
    def is_car_image(self,path):
        try:
            img = open_image(path)
            
            pred_class,pred_idx,outputs = self.model.predict(img)
                
            if not str(pred_class) in ["cars"]:
                return False
            else:
                return True
        except Exception as e:
            print(f'error : {str(e)}')
            return False