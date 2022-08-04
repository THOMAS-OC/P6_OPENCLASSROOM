const path = require("path")
const fs = require("fs")
const Sauce = require('../models/sauceModel');

module.exports = (req, res, next) => {
    Sauce.findOne({_id:req.params.id})
    .then(sauce => {
        
        let filename = sauce.imageUrl;
        filename = filename.split('/')
        filename = filename[filename.length - 1]

        let pathDelete = path.join(process.cwd(),'images/', filename)
        console.log(pathDelete);

        if (sauce.userId == req.auth.userId){
            fs.unlink(pathDelete, () => {
                console.log("Suppression avant update");
            })
            next()
        }

        else {
            res.status(403).json({message : "Utilisateur non autorisé"})
            console.log("non autorisé");
        }

    })

    .catch(err => console.log(err))
};