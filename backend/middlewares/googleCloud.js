const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

// Configura las credenciales de autenticación
const storage = new Storage({
    keyFilename: "./webeventos-d3952-firebase-adminsdk-mf6rf-6bd4d4e37e.json",
    projectId: 'tu-proyecto-id',
});
async function UploadImageToGCS(fileName, filePath, bucketName, contentType) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Leer el archivo de la imagen
    const imageBuffer = fs.readFileSync(filePath);

    // Cargar el buffer de la imagen a Google Cloud Storage
    await file.save(imageBuffer, {
        contentType: contentType,
    });

    console.log(`La imagen ${fileName} cargada exitosamente en el bucket ${bucketName}`);
}

module.exports = UploadImageToGCS


