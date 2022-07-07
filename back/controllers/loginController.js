const path = require("path")
const bcrypt = require("bcrypt")

// Importation du modèle User
const User = require('../models/userModel');

// READ request
const login = (req, res) => {
    res.json({userId : "id1", token : "Supertokenid1"})
}

// CREATE request
const signup = (req, res) => {
    console.log("on est dans la route de création de compte");
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    

}

module.exports = { 
    login,
    signup,
}