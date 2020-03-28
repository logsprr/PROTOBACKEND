require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
const firebase = require('firebase');
const config = {
    apiKey: "AIzaSyDb-8HAjGxahK-dq6mokIVa8Hb2J31rwnY",
    authDomain: "nativetodo-12412.firebaseapp.com",
    databaseURL: "https://nativetodo-12412.firebaseio.com",
    projectId: "nativetodo-12412",
    storageBucket: "nativetodo-12412.appspot.com",
    messagingSenderId: "204666161034",
    appId: "1:204666161034:web:d103f48b20c339b4da6a73"
};
firebase.initializeApp(config);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.listen(3000);
