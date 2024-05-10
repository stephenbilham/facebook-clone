const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");

const app = express();
dotenv.config();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());
// Middleware to parse x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

const routesPath = "./routes";
const routeFiles = readdirSync(routesPath).filter((file) =>
	file.endsWith(".js")
);

routeFiles.forEach((file) => {
	const routePath = `${routesPath}/${file}`;
	app.use("/", require(routePath));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
