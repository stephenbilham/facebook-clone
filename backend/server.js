const express = require("express");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.get("/books", (req, res) => {
	res.send("Hello books!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
