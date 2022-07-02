const express = require("express")
const app = express()
// imporation des routeurs
const sauceRoute = require('./routes/sauceRoute');
const loginRoute = require('./routes/loginRoute');

// Middleware route sauce
app.use('/api/sauces')

// Middleware route login

console.log("Hello world");

app.get("/", (req, res) => {
    res.send("Page d'accueille")
})

app.listen("3000", ()=>{
    console.log("Lancement du serveur");
})