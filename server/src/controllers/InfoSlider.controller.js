const InfoSliderService = require("../services/infoSlider.service");
const formatResponse = require("../utils/formatResponse");

class infoSliderController {

  static async getInfoSliderData(req, res) {
    try {
      const sliderData = await InfoSliderService.get();
      if (sliderData.length === 0 || !sliderData) {
        return res
          .status(200)
          .json(formatResponse(200, "No goal transaction found", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "success", sliderData));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = infoSliderController