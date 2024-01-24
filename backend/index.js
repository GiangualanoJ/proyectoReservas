require('dotenv').config();
const express = require('express');
const cors = require('cors');

/* Crear el servidor de express */
const app = express();
const DownloadFilesFromBucket = require('./middlewares/googleCloudGetImagen');


const admin = require("firebase-admin");
const serviceAccount = require("./webeventos-d3952-firebase-adminsdk-mf6rf-6bd4d4e37e.json")
/* Configurar CORS */
app.use(cors());

/* Lectura y parseo del body */
app.use(express.json());
DownloadFilesFromBucket();


/* Rutas */
app.use('/login', require('./routes/auth'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/salones', require('./routes/salones'))
app.use('/reservas', require('./routes/reservas'))

app.use('/uploads', express.static('uploads'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
