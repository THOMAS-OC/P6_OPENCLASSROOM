const { log } = require("console");
const path = require("path")
// Importation des models
const Sauce = require('../models/sauceModel');
const User = require('../models/userModel');


// CREATE request OK
const createSauce = (req, res) => {
    const sauce = new Sauce({
        userId : 1,
        name : "Sauce",
        manufacturer : "xxx",
        description : "Sauce moutarde",
        mainPepper : "Moutarde",
        imageUrl : "/images/moutarde.jpg",
        heat : 4,
        likes : 2,
        dislikes : 2,
        usersLiked : ["1", "2"] ,
        usersDisliked : ['3', '4']
    })
    sauce.save()
    .then(() => {
        res.status(201).json({message : "Sauce enregistrée !"})
    })
    .catch(err => { 
        res.status(400).json({ err })
        console.log(err);
    })
}

// UPDATE request

const updateLike = (req, res) => {
    res.send("Mise à jour du like")
}


// READ request
// OK
const readOneSauce = (req, res) => {
    Sauce.findById(req.params.id, (err, doc) => {
        if (err){
            res.status(400).json({ err })
        }
        else {
            res.status(201).json(doc)
        }
    })
}

// OK
const readAllSauces = (req, res) => {
    Sauce.find().exec()
    .then(sauces => res.json(sauces))
    .catch(err => console.log(err))
}


// UPDATE request
const updateSauce = (req, res) => {
    res.send("Modification d'une sauce")
}


// DELETE request
// OK
const deleteSauce = (req, res) => {
    Sauce.findByIdAndRemove(req.params.id, (err, confirm)=>{
        if (err){
            res.status(400).json({ err })
        }
        else {
            res.status(201).json({message : `Sauce ${req.params.id} supprimée !`})
        }
    })
}



module.exports = { 
    readOneSauce,
    readAllSauces,
    updateLike,
    deleteSauce,
    updateSauce,
    createSauce,
}