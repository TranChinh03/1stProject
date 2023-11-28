const APP_MODELS = {
  MODEL_Detector: require('../model/bestYolov5Gh.torchscript.ptl'),
  MODEL_Classifier: require('../model/car_classification_model.ptl'),
  classes: require('../model/class.json'),
};

export default APP_MODELS;
