require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
const firebase = require('firebase');
const settingFirebase = require('./json/firebase.json')
const config = settingFirebase;
firebase.initializeApp(config);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.listen(process.env.PORT || 3000);
