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

// Devolviendo el html

app.get("/", (req, res) => {
  try {
    return res.sendFile(__dirname + "/public/index.html");
  } catch (e) {
    console.log("error");
  }
});

// API REST con PostgreSQL(GET)

app.get("/posts", async (req, res) => {
  try {
    const likes = await getPost();
    res.json(likes);
  } catch (error) {
    res.json({ message: "El recurso no está disponible" });
  }
});
