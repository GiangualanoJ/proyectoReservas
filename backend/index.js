require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer')
/* Crear el servidor de express */
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const admin = require("firebase-admin");
const serviceAccount = require("./webeventos-d3952-firebase-adminsdk-mf6rf-6bd4d4e37e.json")
/* Configurar CORS */
app.use(cors());

/* Lectura y parseo del body */
app.use(express.json());


/* Rutas */
app.use('/login', require('./routes/auth'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/salones', require('./routes/salones'))
app.use('/reservas', require('./routes/reservas'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
