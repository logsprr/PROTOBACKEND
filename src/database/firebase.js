const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: process.env.projectId,
    keyFilename: process.env.keyFilename
});
const bucket = storage.bucket(process.env.bucket);

module.exports = bucket;