module.exports = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce)
    let { name, manufacturer, description, mainPepper } = sauceObject;
    console.log(sauceObject);
    console.log(req.body.pathImage);

    // Prévention contre les attaques XSS stockées
    if (name.includes("<") || manufacturer.includes("<") || description.includes("<") || mainPepper.includes("<")){
        console.log("Détection d'une balise html ou de script");
        res.status(400).json({message : "Formulaire non sécurisé"})
    }
    
    else if ( name.length < 3 || manufacturer.length < 5 || description.length < 40 || mainPepper.length < 6 ) {
        console.log("Données non conformes");
        res.status(400).json({message : "Formulaire non valide"})
    }
   
    else{
        next()
    }

};