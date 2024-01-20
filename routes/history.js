const express = require("express")
const { getHistory } = require("../controllers/history")
const router = express.Router()


router.get("/history",getHistory)

module.exports = router