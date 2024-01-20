// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const logSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    actionDate:{
        type:Date,
        required:true,
    },
    action:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    }
    
  }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Logs", logSchema)
