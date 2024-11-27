const Campaign = require("../models/campaignModel");

const campaignController = {
    get: async (req, res) => {
        try {
          const campaigns = await Campaign.get();
          res.status(200).json(campaigns);
        } catch (error) {
          res.status(500).json({ message: "Có lỗi xảy ra! Lỗi: ", error });
        }
      },
};
  
module.exports = campaignController;