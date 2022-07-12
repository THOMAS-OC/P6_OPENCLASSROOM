const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// Importation du modèle User
const User = require('../models/userModel');

// ROUTE DE LOGIN

const login = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'utilisateur non inscrit'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
  
                    res.status(200).json({
                          userId: user._id,
                          token: jwt.sign(
                              { userId: user._id },
                              process.env.SECRETKEY,
                              {expiresIn: "1800s"}
                          )
                    });
                    console.log("auth okay");
  
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  }


// ROUTE D'INSCRIPTION

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