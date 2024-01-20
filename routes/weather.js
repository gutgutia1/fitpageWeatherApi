const express = require("express")
const { cacheMiddleware, getWeatherDetails } = require("../controllers/weather")
const router = express.Router()


router.get("/weather/:id",cacheMiddleware,getWeatherDetails)

module.exports = router