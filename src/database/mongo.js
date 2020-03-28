const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
module.exports = mongoose;