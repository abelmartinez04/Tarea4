CREATE DATABASE IF NOT EXISTS cursos_db;
USE cursos_db;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion INT NOT NULL, -- en horas
    instructor VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (username, password, nombre)
VALUES (
    'admin',
    '$2a$10$u9GgApWcH2xFHf6hNfQK/OgWsVpSJkE06rQ1kJfgwAWFr0Pvp/u0K', 
    'Administrador'
);
