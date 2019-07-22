//Author Arthur Kalikiti
//Radio App
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

//Set EmbeddedJS as the templating engine

app.set('view engine', 'ejs');
app.set('views', './views');
app.use( express.static( './public') );
app.use('/', routes);

//Set the app's listening port

let server = app.listen(process.env.PORT);
console.log("The app is now up and running on port "+ server.address().port);
