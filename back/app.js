const express = require("express")
const app = express()
const path = require("path");
// imporation des routeurs
const sauceRoute = require('./routes/sauceRoute');
const loginRoute = require('./routes/loginRoute');

// Middleware route sauce
app.use('/api/sauces', sauceRoute)

// Middleware route login
app.use('/api/auth', loginRoute)

console.log("Hello world");

app.get("/", (req, res) => {
    res.send("Page d'accueille")
})

app.listen("3000", ()=>{
    console.log("Lancement du serveur");
})