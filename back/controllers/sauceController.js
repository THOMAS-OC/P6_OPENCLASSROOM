const path = require("path")
// Importation des models
const Sauce = require('../models/sauceModel');
const User = require('../models/userModel');


// CREATE request OK
const createSauce = (req, res) => {
    const sauce = new Sauce({
        userId : '62c6e7ca7bdb2a4f4ea3ad1c',
        name : req.body.name,
        manufacturer : req.body.manufacturer,
        description : req.body.description,
        mainPepper : req.body.mainPepper,
        imageUrl : "/images/moutarde.jpg",
        heat : req.body.heatValue,
        likes : 0,
        dislikes : 0,
        usersLiked : [] ,
        usersDisliked : []
    })
    sauce.save()
    .then(() => {
        res.status(201).json({message : 'Sauce enregistrée !'})
    })
    .catch(err => { 
        res.status(400).json({ err })
        console.log(err);
    })
}

// UPDATE request

const updateLike = (req, res) => {
    console.log("id de la sauce : " + req.params.id); // ID DE LA SAUCE
    console.log("id du user : " + req.body.userId); // ID DU USER
    console.log("nombre ajouté au like : " + req.body.like); // chiffre de -1 à 1
    // trouvé la sauce
    Sauce.findById(req.params.id, (err, doc) => {
        if (err){
            res.status(400).json({ err })
        }
        else {
            if (req.body.like == 1){
                // Le supprimer de la liste des dislikes si l'utilisateur y est
                if (doc.usersDisliked.includes(req.body.userId)) {
                    console.log("L'utilisateur est dans les dislikes");
                    let userIndex = doc.usersDisliked.indexOf(req.body.userId)
                    doc.usersDisliked.splice(userIndex, 1)
                }

                doc.usersLiked.push(req.body.userId)

                // Mise à jour du nombre de likes et de dislikes
                doc.dislikes = doc.usersDisliked.length
                doc.likes = doc.usersLiked.length
            }

            else if (req.body.like == 0){
                if (doc.usersLiked.includes(req.body.userId)) {
                    let userIndex = doc.usersLiked.indexOf(req.body.userId)
                    doc.usersLiked.splice(userIndex, 1)
                    doc.likes = doc.usersLiked.length // MAJ DU NOMBRE DE LIKES
                }
                else {
                    let userIndex = doc.usersDisliked.indexOf(req.body.userId)
                    doc.usersDisliked.splice(userIndex, 1) 
                    doc.dislikes = doc.usersDisliked.length // MAJ DU NOMBRE DE DISLIKES
                }
            }

            else {
                // Le supprimer de la liste des likes si l'utilisateur y est
                if (doc.usersLiked.includes(req.body.userId)) {
                    console.log("L'utilisateur est dans les likes");
                    let userIndex = doc.usersLiked.indexOf(req.body.userId)
                    doc.usersLiked.splice(userIndex, 1)
                }
                

                // Ajouter l'utilisateur à la liste de dislikes
                doc.usersDisliked.push(req.body.userId)
                
                // Mise à jour du nombre de likes et de dislikes
                doc.dislikes = doc.usersDisliked.length
                doc.likes = doc.usersLiked.length
            }

            console.log(doc.likes);
            doc.save()
            res.status(201).json(doc)
        }
    })
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