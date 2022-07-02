const path = require("path")

// Importation des models
const Sauce = require('../models/sauceModel');
const User = require('../models/userModel');

// CREATE request
const login = (req, res) => {
    res.send("Connexion")
}

const signup = (req, res) => {
    res.send("Inscription")
}

module.exports = { 
    login,
    signup,
}