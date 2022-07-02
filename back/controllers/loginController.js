const path = require("path")

// Importation des models
const Sauce = require('../models/sauceModel');
const User = require('../models/userModel');

// READ request
const login = (req, res) => {
    res.send("Connexion")
}

// CREATE request
const signup = (req, res) => {
    const user = new User({
        email:"estival.t@hotmail.com",
        password : 'azerty'
    })

    user.save()
    .then(() => {
        res.status(201).json({message : "Nouvel utilisateur !"})
    })
    .catch(err => { 
        res.status(400).json({ err })
        console.log(err);
    })
}

module.exports = { 
    login,
    signup,
}