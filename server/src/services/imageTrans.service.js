const {TransactionRPhoto} = require('../db/models')

class ImageTransService {
  static async addImage(id,img){
    return await TransactionRPhoto.create({transactionR_id:id,url:img})

  }
}
module.exports = ImageTransService