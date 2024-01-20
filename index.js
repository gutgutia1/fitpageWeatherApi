const express=require("express")
const app=express()
const dotenv = require("dotenv");
const rateLimit = require('express-rate-limit');
const database = require("./config/database")
const locationRoutes = require("./routes/locations")
const weatherRoutes = require("./routes/weather")
const historyRoutes = require("./routes/history")
const cookieParser = require("cookie-parser");
const cors = require("cors");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
  });
  
  app.use(limiter);


app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);


dotenv.config();

database.connect();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});
app.use("/api", locationRoutes);
app.use("/api", weatherRoutes);
app.use("/api", historyRoutes);

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});