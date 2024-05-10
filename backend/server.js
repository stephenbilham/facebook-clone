const express = require("express");
const mongoose = require("./db/mongoose"); // all though this isnt beeing called express is understanding its here (Can remove the const mongoose)
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

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
