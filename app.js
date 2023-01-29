const constroller = require("./controllers/nav");
require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", constroller.books);

app.get("/books", constroller.books);

app.get("/authors", constroller.authors);

app.get("/magazines", constroller.magazine);

app.get("/sorted", constroller.sorted);

app.get("/download", constroller.download);

app.get("*", constroller.error);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
