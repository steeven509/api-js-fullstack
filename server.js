const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({ path: "./config/.env"});
const app = express();

//Connexion à la base de données 
connectDB();

//Middleware qui permet de traiter les donnés de Request 
app.use(express.json());
app.use(express.urlencoded( { extended: false }));


app.use( "/post" , require('./routes/post.routes'))

//Start the server
app.listen(process.env.port ,
      () => console.log("Le server est lancer au port " + process.env.port));
