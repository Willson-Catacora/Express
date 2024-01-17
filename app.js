const express = require('express');
const app = express();
//sintasis de destructuracion
const {infoCursos} = require('./cursos');

//rutas en express (routing)
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express. :v');
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});