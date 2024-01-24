const { Storage } = require('@google-cloud/storage');
// const fs = require('fs');
const path = require('path');


const storage = new Storage({
    keyFilename: "./webeventos-d3952-firebase-adminsdk-mf6rf-6bd4d4e37e.json",
    projectId: 'tu-proyecto-id',
});


const bucketName = 'clientes-proyecto';
const bucket = storage.bucket(bucketName);

const localFolderPath = './uploads';

async function DownloadFilesFromBucket() {
    const [files] = await bucket.getFiles();
    
    for (const file of files) {
        const localFilePath = path.join(localFolderPath, file.name);
        const options = {
            destination: localFilePath,
        };
        
        await bucket.file(file.name).download(options);
        console.log(`Archivo ${file.name} descargado exitosamente.`);
    }
}

module.exports = DownloadFilesFromBucket