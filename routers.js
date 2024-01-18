const express = require('express');
const app = express();
//sintasis de destructuracion
const {infoCursos} = require('./cursos');

// Routers
const routerProgramacion = express.Router();
const routerMatematicas = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);
app.use('/api/cursos/matematicas', routerMatematicas);

// el (process.env.PORT) es para capturar el puerto que nos asigna el host
const PUERTO = process.env.PORT || 3000;

//rutas en express (routing)
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express. :v');
});
app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
});
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

//parametros de ruta (parametros de url)
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    // Si la url tiene Parametro Querys
    // console.log(req.query.ordenar);
    if(req.query.ordenar === 'vistas'){
        return res.send(JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas)));
    }
    res.send(JSON.stringify(resultados));
});
routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));
});
// Con dos parametros
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje &&  curso.nivel === nivel);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }
    res.send(JSON.stringify(resultados));
});

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});