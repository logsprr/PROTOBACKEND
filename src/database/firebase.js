const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: "nativetodo-12412",
    keyFilename: "src/json/google.json"
});
const bucket = storage.bucket("gs://nativetodo-12412.appspot.com");

module.exports = bucket;