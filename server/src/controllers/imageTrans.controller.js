const ImageTransService = require("../services/imageTrans.service");
const formatResponse = require("../utils/formatResponse");

class ImageTransController {
  static async upload(req,res){
    const { id } = req.params;
    const { filename } = req.file;
    console.log(id, filename, 44);
try {
  const uploadingImages = await ImageTransService.addImage(id, filename);
  if (uploadingImages) {
    res
      .status(201)
      .json(formatResponse(201, "Success add image", uploadingImages));
  }
} catch ({ message }) {
  return res
    .status(500)
    .json(formatResponse(500, "Server error", null, message));
}
  }
}
module.exports = ImageTransController