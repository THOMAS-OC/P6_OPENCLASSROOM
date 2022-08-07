const jwt = require('jsonwebtoken');
const path = require("path")
const fs = require("fs")
// Importation des models
const Sauce = require('../models/sauceModel');
const User = require('../models/userModel');


// CREATE
const createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        userId : req.auth.userId,
        name : sauceObject.name,
        manufacturer : sauceObject.manufacturer,
        description : sauceObject.description,
        mainPepper : sauceObject.mainPepper,
        imageUrl : `https://localhost:3001/images/${req.body.pathImage}`,
        heat : sauceObject.heat,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    })
    sauce.save()
    .then(() => {
        res.status(201).json({message : 'Sauce enregistrée !'})
    })
    .catch(error => { 
        console.log(error);
        res.status(400).json({ error })
    })

}

// UPDATE request

const like = (req, res) => {
    // trouvé la sauce
    Sauce.findById(req.params.id, (err, doc) => {

        if (err){
            res.status(400).json({ err })
        }

        else {

            // LIKE
            if (req.body.like == 1){

                // PRESENCE D'UN DISLIKE DANS LA BDD
                if (doc.usersDisliked.includes(req.auth.userId)) {

                    // suppression du dislike
                    let userIndex = doc.usersDisliked.indexOf(req.auth.userId)
                    doc.usersDisliked.splice(userIndex, 1)

                    // ajout du like
                    doc.usersLiked.push(req.auth.userId)

                    // Mise à jour du nombre de likes et de dislikes
                    doc.dislikes = doc.usersDisliked.length
                    doc.likes = doc.usersLiked.length

                    // Return
                    doc.save()
                    res.status(201).json(doc)
                }


                // DOUBLON DE LIKE
                else if (doc.usersLiked.includes(req.auth.userId)){
                    res.status(400).json({message : "Limit like"})
                }

                // CAS NOMINAL

                else {
                    // ajout du like
                    doc.usersLiked.push(req.auth.userId)

                    // Mise à jour du nombre de likes et de dislikes
                    doc.dislikes = doc.usersDisliked.length
                    doc.likes = doc.usersLiked.length

                    // Return
                    doc.save()
                    res.status(201).json(doc)
                }

                // Mise à jour du nombre de likes et de dislikes
                doc.dislikes = doc.usersDisliked.length
                doc.likes = doc.usersLiked.length

            }

            // REMOVE LIKE OR DISLIKE
            else if (req.body.like == 0){

                // suppression de like
                if (doc.usersLiked.includes(req.auth.userId)) {
                    let userIndex = doc.usersLiked.indexOf(req.auth.userId)
                    doc.usersLiked.splice(userIndex, 1)
                    doc.likes = doc.usersLiked.length // MAJ DU NOMBRE DE LIKES
                }
                
                // suppression de dislike
                else {
                    let userIndex = doc.usersDisliked.indexOf(req.auth.userId)
                    doc.usersDisliked.splice(userIndex, 1) 
                    doc.dislikes = doc.usersDisliked.length // MAJ DU NOMBRE DE DISLIKES
                }

                // Mise à jour du nombre de likes et de dislikes
                doc.dislikes = doc.usersDisliked.length
                doc.likes = doc.usersLiked.length

                // Return
                doc.save()
                res.status(201).json(doc)

            }

            // DISLIKE
            else {

                // PRESENCE D'UN LIKE DANS LA BDD
                if (doc.usersLiked.includes(req.auth.userId)) {

                    let userIndex = doc.usersLiked.indexOf(req.auth.userId)
                    doc.usersLiked.splice(userIndex, 1)

                    // Ajouter l'utilisateur à la liste de dislikes
                    doc.usersDisliked.push(req.auth.userId)
                    
                    // Mise à jour du nombre de likes et de dislikes
                    doc.dislikes = doc.usersDisliked.length
                    doc.likes = doc.usersLiked.length

                    // Return
                    doc.save()
                    res.status(201).json(doc)
                }

                // Empêcher plusieurs dislike
                else if (doc.usersDisliked.includes(req.auth.userId)){
                    res.status(400).json({message : "Limit dislike"})
                }

                // Cas nominal
                else {

                    // Ajouter l'utilisateur à la liste de dislikes
                    doc.usersDisliked.push(req.auth.userId)
                    
                    // Mise à jour du nombre de likes et de dislikes
                    doc.dislikes = doc.usersDisliked.length
                    doc.likes = doc.usersLiked.length

                    // Return
                    doc.save()
                    res.status(201).json(doc)

                }

            }
        }
    })
}


// READ request

const readOneSauce = (req, res) => {
    Sauce.findById(req.params.id, (err, doc) => {
        if (err){
            res.status(404).json({ err })
        }
        else {
            res.status(201).json(doc)
        }
    })
}

const readAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => res.json(sauces))
    .catch(error => res.status(404).json({ error }));
}

// UPDATE request
const updateSauce = (req, res) => {

    console.log(req.auth.userId);

    Sauce.findOne({_id:req.params.id})
    .then(sauce => {
        if (sauce.userId == req.auth.userId){
            // UPDATE INFO
            if(req.headers['content-type'] == "application/json"){
                Sauce.findByIdAndUpdate(req.params.id, {
                    name: req.body.name,
                    description: req.body.description,
                    mainPepper : req.body.mainPepper,
                    heat : req.body.heat,
                    manufacturer : req.body.manufacturer,
                    userId : req.body.userId
                }, (err, sauceModified) => {
                    if(err){
                        res.status(400).json(err)
                    }
                    else{
                        res.status(201).json({message: "Sauce modifiée !"})
                    }
                })
            }

            // UPDATE INFO AND IMAGE
            else {
                const sauceObject = JSON.parse(req.body.sauce)
                Sauce.findByIdAndUpdate(req.params.id, {
                    name: sauceObject.name,
                    description: sauceObject.description,
                    mainPepper : sauceObject.mainPepper,
                    heat : sauceObject.heat,
                    manufacturer : sauceObject.manufacturer,
                    userId : sauceObject.userId,
                    imageUrl : `https://localhost:3001/images/${req.body.pathImage}`,
                }, (err, sauceModified) => {
                    if(err){
                        res.status(400).json(err)
                    }
                    else{
                        res.status(201).json({message: "Sauce modifiée avec nouvelle image !"})
                    }
                })
            }
        }

        else {
            res.status(403).json({message : "Utilisateur non autorisé"})
        }
    })

    .catch(error => res.status(400).json({ error }))

}


// DELETE request
// OK
const deleteSauce = (req, res) => {

    Sauce.findOne({_id:req.params.id})
    .then(sauce => {
        
        if (sauce.userId == req.auth.userId){
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }

        else {
            res.status(403).json({message : "Utilisateur non autorisé"})
        }

    })

    .catch(error => res.status(400).json({ error }));

}



module.exports = { 
    // CREATE
    createSauce,

    // READ
    readOneSauce,
    readAllSauces,

    // UPDATE
    updateSauce,
    like,
    
    // DELETE
    deleteSauce,
}