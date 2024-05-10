const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Database connected succesfully"))
	.catch((err) => console.log("Error connecting to DB", err));
