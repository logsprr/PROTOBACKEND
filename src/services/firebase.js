const bucket = require('../database/firebase');
const { format } = require('util');
module.exports = uploadImageToStorage = (req, res, next) => {
    let file = req.file;
    let type = req.text;
    return new Promise((resolve, reject) => {
        if (!file) {
            res.status(400).send('O arquivo nao foi para a nuvem.');
        }
        let newFileName = `${Date.now()}_${file.originalname}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            gzip: true,
            resumable: true,
            metadata: {
                contentType: req.file.mimetype
            }
        });
        blobStream.on('error', (error) => {
            console.log(error)
            res.status(400).send('Não foi possivel fazer o upload.');
        });
        blobStream.on('finish', () => {
            const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            type == 'image' ? req.body.photoUrl = url : req.body.fileUrl = url;
            console.log(url);
            next();
        });

        blobStream.end(file.buffer);
    });
}