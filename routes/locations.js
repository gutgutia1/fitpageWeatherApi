const express = require("express")
const router = express.Router()

const {getLocationDetails, postLocationDetails} = require("../controllers/location")
const { getSpecificLocationDetails, putLocationDetails, deleteLocationDetails } = require("../controllers/specificLocation")

router.get("/locations", getLocationDetails)
router.post("/locations", postLocationDetails)
router.get("/locations/:id",getSpecificLocationDetails)
router.put("/locations/:id",putLocationDetails)
router.delete("/locations/:id",deleteLocationDetails)



module.exports = router