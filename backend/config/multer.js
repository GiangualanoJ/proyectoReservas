'use strict'

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        cd(null, path.join(__dirname,'../imagenes'))
    },
    filename: function(req, file, cd) {
        cd(null, `${file.fieldname}.${file.mimetype.split('/')[1]}`)
    }
})

module.exports = storage