// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const locationsSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    name: {
      type: String,
      required: true,
      trim: true
    },
    latitude : {
        type: String,
        required: true,
        trim: true
    },
    longitude : {
        type: String,
        required: true,
        trim: true
    }
    
  }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Location", locationsSchema)
