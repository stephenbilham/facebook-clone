const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");

const app = express();
const port = 8000;

app.use(cors());

const routesPath = "./routes";
const routeFiles = readdirSync(routesPath).filter((file) =>
	file.endsWith(".js")
);

routeFiles.forEach((file) => {
	const routePath = `${routesPath}/${file}`;
	app.use("/", require(routePath));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
