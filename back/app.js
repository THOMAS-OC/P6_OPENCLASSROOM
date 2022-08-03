const express = require("express")
const path = require("path");
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const helmet = require('helmet');
const https = require("https")
const fs = require("fs")
const app = express()

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader(
      "Cross-Origin-Resource-Policy",
      "cross-origin"
    );
    next();
});

// Ajout HTTPS
const key = fs.readFileSync(__dirname + "/" + "localhost-key.pem", "utf-8");
const cert = fs.readFileSync(__dirname + "/" + "localhost.pem", "utf-8");

// imporation des routeurs
const sauceRoute = require('./routes/sauceRoute');
const loginRoute = require('./routes/loginRoute');

// Connexion à la BDD
const mongoAtlasUri = `mongodb+srv://thomas:${process.env.PASSWORDBDD}@cluster0.t5pqev1.mongodb.net/P6_OC?retryWrites=true&w=majority`;

mongoose.connect(mongoAtlasUri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));



// routing pour les images
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.static('images'));

// Middleware route sauce
app.use('/api/sauces', sauceRoute)
// Middleware route login
app.use('/api/auth', loginRoute)

https.createServer({ key, cert }, app).listen(3000);

// app.listen(process.env.PORT, ()=>{
//     console.log("Lancement du serveur");
// })
