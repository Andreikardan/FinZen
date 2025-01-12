const infoSliderController = require("../controllers/InfoSlider.controller");

const router = require("express").Router();

router.get('/',infoSliderController.getInfoSliderData)

module.exports = router