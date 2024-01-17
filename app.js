const express = require('express');
const app = express();
//sintasis de destructuracion
const {infoCursos} = require('./cursos');

// el (process.env.PORT) es para capturar el puerto que nos asigna el host
const PUERTO = process.env.PORT || 3000;

//rutas en express (routing)
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express. :v');
});
app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});
app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
});
app.get('/api/cursos/matematicas', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});