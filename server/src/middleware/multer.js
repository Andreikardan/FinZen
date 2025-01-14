const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "public"));
  },
  filename(req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); 
  } else {
    cb(new Error('Неверный тип файла. Разрешены только изображения.'), false); 
  }
};

module.exports = multer({ storage, fileFilter });
