const router = require("express").Router();
const ImageTransController = require("../controllers/imageTrans.controller");
const multerMiddleware = require('../middleware/multer')

router.post('/upload/:id',multerMiddleware.single('trPhoto'),ImageTransController.upload)

module.exports = router