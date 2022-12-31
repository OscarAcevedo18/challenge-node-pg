-- Creando la base de datos 

CREATE DATABASE likeme;

-- Accediendo a la base de datos 

\c likeme

-- Creando tabla con el contenido a trabajar

CREATE TABLE posts
(id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),
 descripcion VARCHAR(255), likes INT);