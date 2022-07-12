const express = require("express")
const app = express()
const path = require("path");
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
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
    next();
});

// traitement du json
// app.use(express.urlencoded({extended: true}));

// imporation des routeurs
const sauceRoute = require('./routes/sauceRoute');
const loginRoute = require('./routes/loginRoute');

// Connexion à la BDD
const mongoAtlasUri = `mongodb+srv://thomas:${process.env.PASSWORD}@cluster0.t5pqev1.mongodb.net/P6_OC?retryWrites=true&w=majority`;

mongoose.connect(mongoAtlasUri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie sur atlas !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



// routing pour les images
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.static('images'));

// Middleware route sauce
app.use('/api/sauces', sauceRoute)
// Middleware route login
app.use('/api/auth', loginRoute)


app.get("/", (req, res) => {
    res.send("Page d'accueil")
})


app.listen("3000", ()=>{
    console.log("Lancement du serveur");
})
