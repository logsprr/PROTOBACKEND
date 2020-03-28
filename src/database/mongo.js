const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://protonative:cdxmGfrAiPvcyqMi@cluster0-duexj.mongodb.net/protonative?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;