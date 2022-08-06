const express = require("express")
const path = require("path");
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const helmet = require('helmet');
const https = require("https")
const http = require('http')
const fs = require("fs")
const app = express()

dotenv.config()
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
const key = fs.readFileSync(path.join(__dirname, 'localhost-key.pem'), "utf-8");
const cert = fs.readFileSync(path.join(__dirname, 'localhost.pem'), "utf-8");

// imporation des routeurs
const sauceRoute = require('./routes/sauceRoute');
app.use('/api/sauces', sauceRoute)
const loginRoute = require('./routes/loginRoute');
app.use('/api/auth', loginRoute)

// Connexion à la BDD
const mongoAtlasUri = process.env.CONNECTBDD;

mongoose.connect(mongoAtlasUri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));


// routing pour les images
app.use('/images', express.static('images'))

http.createServer(app).listen(process.env.PORT || 3000);
https.createServer({ key, cert }, app).listen(process.env.PORTHTTPS || 3001);
