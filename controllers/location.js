const Location = require("../models/locations")
const Logs = require("../models/logs")

exports.getLocationDetails = async(req,res)=>{
    try{
        const actionDate = new Date()
        const action = "GET"
        const service = "Get list of locations in the db"
        const locationDetails  = await Location.find();
        await Logs.create({actionDate,action,service})
        return res.status(200).json({
            success: true,
            message: "Locations fetched successfully",
            locationDetails
          })
    }
    catch (error) {
        console.error(error)
        const actionDate = new Date()
        const action = "GET"
        const service = "Issue while getting list of location"
        await Logs.create({actionDate,action,service})
        return res.status(500).json({
          success: false,
          message: "Locations cannot be fetched",
        })
      }
}


exports.postLocationDetails = async(req,res)=>{
    function containsOnlyNumbers(inputString) {
        // Use a regular expression to check if the string contains only numbers
        return /^\d+$/.test(inputString);
    }
    function containsOnlyAlphabets(inputString) {
        // Use a regular expression to check if the string contains only alphabets
        return /^[a-zA-Z]+$/.test(inputString);
    }
    try{
        const actionDate = new Date()
        const action = "POST"
        var service = "Added a new Location"
        const {name,latitude,longitude} = req.body
        if(!name || !latitude || !longitude){
            return res.status(400).json({
                success:false,
                message:"name or latitude or longitude is missing "
            })
        }
        if(!containsOnlyAlphabets(name)){
            return res.status(400).json({
                success:false,
                message:"name should be string only "
            })
        }
        if(!containsOnlyNumbers(longitude) || !containsOnlyNumbers(latitude)){
            return res.status(400).json({
                success:false,
                message:"latitude and longitude should be numeric only "
            })
        }
        const existingLocation  = await Location.findOne({name,latitude,longitude});
        
        if(existingLocation){
            service = "Location already existed while adding"
            await Logs.create({actionDate,action,service})
            return res.status(400).json({
                success: false,
                message: "Location Already Exists",
              })
        }
        const location = await Location.create({name,latitude,longitude})
        service =`Added a new location ${name}`
        await Logs.create({actionDate,action,service})
        return res.status(200).json({
            success: true,
            message: "Location registered successfully",
            location
          })
        } catch (error) {
          console.error(error)
          const actionDate = new Date()
            const action = "POST"
            const service = "Issue while adding location"
          await Logs.create({actionDate,action,service})
          return res.status(500).json({
            success: false,
            message: "Location cannot be registered. Please try again.",
          })
        }
      }
      