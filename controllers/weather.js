const Location = require("../models/locations")
const axios = require('axios');
const cache = require('memory-cache');
const dotenv = require("dotenv")
const Logs = require("../models/logs")


dotenv.config();
apiKey = process.env.API_KEY
exports.cacheMiddleware = async(req, res, next) => {
    const actionDate = new Date()
    const action = "GET"
    var service = "Get weather details on the basis of location id"
    const id = req.params.id
    const key = req.originalUrl || req.url;
    const cachedData = cache.get(key);
    
    if (cachedData) { 
        await Logs.create({id,actionDate,action,service})  
           // If data is cached, send it back
           return res.status(200).json({
            success:true,
            message:"Weather details are as follows",
            cachedData
        })
    //    res.send(cachedData);
    } else {
      // If not cached, proceed to the route handler
      next();
    }
  };

exports.getWeatherDetails = async(req,res)=>{
    try{
        const locationId = req.params.id
        const id= locationId
        const actionDate = new Date()
        const action = "GET"
        var service = "Get weather details on the basis of location id"
        if(locationId.length != 24){
            service = `Location Id : ${locationId}was incorrect `
            await Logs.create({actionDate,action,service})
            return res.status(500).json({
                success: false,
                message: "locationId given is wrong"
              })
        }
        const locationDetails  = await Location.findById(locationId);
        if(!locationDetails){
            service = `Location Id : ${locationId}was not found`
            await Logs.create({actionDate,action,service})
            return res.status(200).json({
                success: true,
                message: "No location found with this id"
              })
        }
        try{
            console.log("Calling external Api")
            const apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationDetails.name}&appid=${apiKey}&units=metric`);
            const data= await apiResponse.data
            // Cache the API response for 5 minutes (adjust as needed)
            cache.put(req.originalUrl || req.url, apiResponse.data, 5 * 60 * 1000);
            await Logs.create({id,actionDate,action,service})

            return res.status(200).json({
                success:true,
                message:"Weather details are as follows",
                data
            })

        }
        catch(err){
            console.error(err)
            const actionDate = new Date()
    const action = "GET"
    var service = "issue came while calling external weather api"
    await Logs.create({actionDate,action,service})
            return res.status(500).json({ 
              success: false,
              message: "weather api is down",
            })
          }
            
        }
    catch(error){
        console.error(error)
        const actionDate = new Date()
        const action = "GET"
        var service = "issue in location id"
        await Logs.create({actionDate,action,service})
        return res.status(500).json({
          success: false,
          message: "some issue in location id",
        })
      }
}