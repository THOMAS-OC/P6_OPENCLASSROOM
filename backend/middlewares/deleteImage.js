const path = require("path")
const fs = require("fs")
const Sauce = require('../models/sauceModel');

module.exports = (req, res, next) => {

    // IF UPDATE INFO : NO DELETE
    if(req.headers['content-type'] == "application/json"){
         next()
    }
        
    // IF INFO AND IMAGE : DELETE
    else {
        Sauce.findOne({_id:req.params.id})
        .then(sauce => {
            
            let filename = sauce.imageUrl;
            filename = filename.split('/')
            filename = filename[filename.length - 1]

            let pathDelete = path.join(process.cwd(),'images/', filename)

            if (sauce.userId == req.auth.userId){
                fs.unlink(pathDelete, () => next())
            }

            else {
                res.status(403).json({message : "Utilisateur non autorisé"})
            }

        })

        .catch(error => res.status(400).json({ error }))
    }
};