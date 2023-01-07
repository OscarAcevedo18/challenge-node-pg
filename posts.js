// Primera consulta SQL con Node
const pool = require("./conectDb").getInstance();

//Funcion muestra si existe registro con los mismos datos que queremos agregar//

const duplicatePost = async (payload) => {
  const SQLquery = {
    text: "SELECT COUNT(*) as NUM FROM posts WHERE titulo=$1 AND img=$2 AND descripcion=$3",
    values: [payload.titulo, payload.url, payload.descripcion],
  };
  const { rows } = await pool.query(SQLquery);
  return rows;
};

// Primer registro en PostgreSQL desde Node

const addPost = async (payload) => {
  const SQLquery = {
    text: "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *",
    values: [payload.titulo, payload.url, payload.descripcion, payload.likes],
  };
  try {
    const result = await pool.query(SQLquery);
    console.log("Post agregado");
    return result.rows;
  } catch (e) {
    console.log(
      "error al insertar datos en tabla product: ",
      e.code,
      e.message
    );
    throw new Error(e);
  }
};

// Obteniendo registros de PostgreSQL desde Node

const getPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
  } catch (e) {
    console.log("error");
  }
};

const modifiedPosts = async (id) => {
  try {
    const consulta =
      "UPDATE posts SET likes = CASE WHEN likes IS NULL THEN 1 ELSE likes +1 END WHERE id=$1 RETURNING *";
    const values = [id];
    const result = await pool.query(consulta, values);
  } catch (e) {
    console.log("error");
  }
};


// MODULE EXPORTS

module.exports = { addPost, getPost, duplicatePost, modifiedPosts };
