const path = require("path")
const fs = require("fs")

module.exports = (req, res, next) => {
    let sauceObject;
    let deleteImage = false

    // IF UPDATE INFO
    if(req.headers['content-type'] == "application/json"){
        sauceObject = req.body
    }
    
    // IF INFO AND IMAGE
    else {
        sauceObject = JSON.parse(req.body.sauce)
        deleteImage = true
    }

    let { name, manufacturer, description, mainPepper } = sauceObject;

    // Prévention contre les attaques XSS stockées
    if (name.includes("<") || manufacturer.includes("<") || description.includes("<") || mainPepper.includes("<")){

        if (deleteImage){
            let pathDelete = path.join(process.cwd(),'/images/', req.body.pathImage)
            console.log(pathDelete);
            // Suppression de l'image enregistrée
            fs.unlink(pathDelete, () => {
                res.status(400).json({message : "Formulaire non sécurisé"})
            })
        }
        else {
            res.status(400).json({message : "Formulaire non sécurisé"})
        }

    }
    
    else if ( name.length < 3 || manufacturer.length < 5 || description.length < 40 || mainPepper.length < 6 ) {

        if (deleteImage) {
            let pathDelete = path.join(process.cwd(),'/images/', req.body.pathImage)
            console.log(pathDelete);
            // Suppression de l'image enregistrée
            fs.unlink(pathDelete, () => {
                res.status(400).json({message : "Formulaire non valide"})
            })
        }

        else {
            res.status(400).json({message : "Formulaire non valide"})
        }

    }
   
    else{
        next()
    }

};