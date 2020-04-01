require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const routes = require('./routes/routes');
const firebase = require('firebase');
const moment = require('moment');
const config = {
    apiKey: "AIzaSyDb-8HAjGxahK-dq6mokIVa8Hb2J31rwnY",
    authDomain: "nativetodo-12412.firebaseapp.com",
    databaseURL: "https://nativetodo-12412.firebaseio.com",
    projectId: "nativetodo-12412",
    storageBucket: "nativetodo-12412.appspot.com",
    messagingSenderId: "204666161034",
    appId: "1:204666161034:web:d103f48b20c339b4da6a73"
}
firebase.initializeApp(config);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

io.on('connection', function (socket) {
    const { userLogin, enterpriseId } = socket.handshake.query;
    console.log(userLogin, enterpriseId);
    firebase.database().ref('enterprises/' + enterpriseId + '/users/' + userLogin).update({ status: 'online as ' + moment(new Date).format('HH:mm') + ' horas' });
    socket.on('disconnect', function () {
        firebase.database().ref('enterprises/' + enterpriseId + '/users/' + userLogin).update({ status: 'visto por ultimo as' + moment(new Date).format('HH:mm') + ' horas' });
        console.log('desconectou')
    })
});

http.listen(process.env.PORT || 3000);
