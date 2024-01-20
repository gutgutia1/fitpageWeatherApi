const Location = require("../models/locations")
const Logs = require("../models/logs")


exports.getSpecificLocationDetails = async(req,res)=>{
    try{
        const actionDate = new Date()
        const action = "GET"
        var service = "Get location details on the basis of locationid"
        const locationId = req.params.id
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
        service = `Get location details on the basis of location id for location name :${locationDetails.name}}`
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
        var service = "Issue while getting specific location with location id"
        await Logs.create({actionDate,action,service})
        return res.status(500).json({
          success: false,
          message: "Locations cannot be fetched",
        })
      }
}

exports.putLocationDetails = async(req,res)=>{
    try{
        const actionDate = new Date()
        const action = "PUT"
        var service = "Updated the location in the db using location id"
        const locationId = req.params.id
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
        const {name,latitude,longitude} = req.body
        
        const location = await Location.findOneAndUpdate({_id:locationId},{name,latitude,longitude},{new:true})
        service = `Updated location details on the basis of location id for location name :${location.name}}`
        await Logs.create({actionDate,action,service})
        return res.status(200).json({
            success: true,
            message: "Location updated successfully",
            location
          })
        } catch (error) {
            const actionDate = new Date()
        const action = "PUT"
        var service = "Issue while updating specific location with location id"
        await Logs.create({actionDate,action,service})
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "Location cannot be updated. Please try again.",
          })
        }
      }

exports.deleteLocationDetails = async(req,res)=>{
try{
    const actionDate = new Date()
        const action = "DELETE"
        var service = "Deleted the location in the db using location id"
        
    const locationId = req.params.id
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
    
    
    const location = await Location.deleteOne({_id:locationId})
    service = `Deleted location details on the basis of location id for location name :${locationDetails.name}}`
    await Logs.create({actionDate,action,service})
    return res.status(200).json({
        success: true,
        message: "Location deleted successfully",
        })
    } catch (error) {
        const actionDate = new Date()
        const action = "DELETE"
        var service = "Issue while deleting specific location with location id"
        await Logs.create({actionDate,action,service})
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Location cannot be deleted. Please try again.",
        })
    }
    }
    
