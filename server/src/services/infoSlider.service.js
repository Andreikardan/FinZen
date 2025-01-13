const {infoSlider} = require('../db/models')

class InfoSliderService {
static async get (){
  return await infoSlider.findAll()
}
}
module.exports = InfoSliderService