const express = require("express");
const { getAllActivities } = require("../controllers/activityController");

const router = express.Router();

router.get("/activities", getAllActivities);

module.exports = router;
