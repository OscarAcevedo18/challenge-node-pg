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

const errorServer = {
  status: 500,
  statusText: "error",
  text: "Error interno del servidor",
};

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

// API REST con PostgreSQL(POST)
app.post("/posts", async (req, res) => {
  try {
    const payload = req.body;
    const resultDuplicate = await duplicatePost(payload);
    if (
      payload.id === "" ||
      payload.titulo === "" ||
      payload.url === "" ||
      payload.descripcion === ""
    ) {
      res.send("Falta Ingresar Datos");
      // console.log("Falta Ingresar Datos");
    } else if (resultDuplicate[0].num > 0) {
      res.send("Registro Ya Existente");
      // console.log("Registro Ya Existente");
    } else {
      await addPost(payload);
      res.send("Post Agregado con Éxito");
    }
  } catch (error) {
    res
      .status(errorServer.status)
      .send({ status: errorServer.statusText, data: errorServer.text });
  }
});
