const Activity = require("../models/activityModel");

exports.getAllActivities = (req, res) => {
  try {
    Activity.findAll(async (err, activities) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
      }

      res.status(200).json({
        success: true,
        data: activities,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
