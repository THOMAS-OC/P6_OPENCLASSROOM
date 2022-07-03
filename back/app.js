const express = require("express")
const app = express()
const path = require("path");
const mongoose = require('mongoose')

// traitement du json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// imporation des routeurs
const sauceRoute = require('./routes/sauceRoute');
const loginRoute = require('./routes/loginRoute');

// Connexion à la BDD
mongoose.connect('mongodb://localhost:27017/P6_OC')
.then( () =>{
    console.log("Connexion ok");
})
.catch( err => {
    console.log(err);
})




// Middleware route sauce
app.use('/api/sauces', sauceRoute)
// Middleware route login
app.use('/api/auth', loginRoute)

console.log("Hello world");

app.get("/", (req, res) => {
    res.send("Page d'accueil")
})



app.listen("3000", ()=>{
    console.log("Lancement du serveur");
})