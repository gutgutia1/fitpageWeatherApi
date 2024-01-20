const Logs = require("../models/logs")


exports.getHistory=async(req,res)=>{
    try{
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(currentDate.getDate() - 15);
    const thrityDaysAgo = new Date();
    thrityDaysAgo.setDate(currentDate.getDate() - 30);

    const resultseven = await Logs.find({
        actionDate: {
        $gte: sevenDaysAgo,
        $lte: currentDate,
        },
    });
    const resultfifteen = await Logs.find({
        actionDate: {
        $gte: fifteenDaysAgo,
        $lte: currentDate,
        },
    });
    const resultthirty = await Logs.find({
        actionDate: {
        $gte: thrityDaysAgo,
        $lte: currentDate,
        },
    });
    response = {
        "History of 7 days":resultseven,
        "History of 15 days":resultfifteen,
        "History of 30 days":resultthirty
    }
    return res.status(200).json({
        success: true,
        message: "Locations fetched successfully",
        response
      })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "History cannot be fetched",
          })
    }
}