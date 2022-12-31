// API REST con PostgreSQL(GET)
const { addPost, getPost, duplicatePost } = require("./posts");
const express = require("express");
const app = express();
const cors = require("cors");
const CsbInspector = require("csb-inspector");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(process.env.PORT, console.log("SERVIDOR ENCENDIDO"));

CsbInspector();