const rootpath = require('rootpath')();
const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./src/config/config.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');



app.get('/', function (req, res) {
    res.send('empresa_ropa');
});

//variables
const remerasCont = require('./src/controller/remerascontroller.js');
app.use('/api/remeras',remerasCont);

const mallasCont = require('./src/controller/mallascontroller.js');
app.use('/api/mallas',mallasCont);

const chanclasCont = require('./src/controller/chanclascontroller.js');
app.use('/api/chanclas',chanclasCont);

const pantalonesCont = require('./src/controller/pantalonescontroller.js');
app.use('/api/pantalones',pantalonesCont);

const pantalonesCont = require('./src/controller/buzosycamperascontroller.js');
app.use('/api/buzosycamperas',buzosycamperasCont);

app.listen(config.server.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server iniciado en puerto:${config.server.port}`);
    }
});