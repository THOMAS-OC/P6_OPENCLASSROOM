const path = require("path")
const fs = require("fs")

module.exports = (req, res, next) => {

    console.log("print");
    console.log(req.body);
    console.log('print');
    const sauceObject = JSON.parse(req.body.sauce)
    let { name, manufacturer, description, mainPepper } = sauceObject;

    // Prévention contre les attaques XSS stockées
    if (name.includes("<") || manufacturer.includes("<") || description.includes("<") || mainPepper.includes("<")){
        let pathDelete = path.join(process.cwd(),'/images/', req.body.pathImage)
        console.log(pathDelete);
        // Suppression de l'image enregistrée
        fs.unlink(pathDelete, () => {
            res.status(400).json({message : "Formulaire non sécurisé"})
        })

    }
    
    else if ( name.length < 3 || manufacturer.length < 5 || description.length < 40 || mainPepper.length < 6 ) {
        let pathDelete = path.join(process.cwd(),'/images/', req.body.pathImage)
        console.log(pathDelete);
        // Suppression de l'image enregistrée
        fs.unlink(pathDelete, () => {
            res.status(400).json({message : "Formulaire non valide"})
        })

    }
   
    else{
        next()
    }

};