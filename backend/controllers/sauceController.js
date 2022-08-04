const jwt = require('jsonwebtoken');
const path = require("path")
const fs = require("fs")
// Importation des models
const Sauce = require('../models/sauceModel');
const User = require('../models/userModel');


// CREATE
const createSauce = (req, res) => {

    const nameSauceRegex = new RegExp('^[a-zA-Z]{3,100}');

    const sauceObject = JSON.parse(req.body.sauce)
    console.log(sauceObject);
    console.log(req.body.pathImage);

    if (nameSauceRegex.test(sauceObject.name)){
        console.log("okay");
    }

    const sauce = new Sauce({
        userId : req.auth.userId,
        name : sauceObject.name,
        manufacturer : sauceObject.manufacturer,
        description : sauceObject.description,
        mainPepper : sauceObject.mainPepper,
        imageUrl : `https://localhost:3000/images/${req.body.pathImage}`,
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

            // LIKE
            if (req.body.like == 1){

                // PRESENCE D'UN DISLIKE DANS LA BDD
                if (doc.usersDisliked.includes(req.body.userId)) {

                    // suppression du dislike
                    console.log("L'utilisateur est dans les dislikes");
                    let userIndex = doc.usersDisliked.indexOf(req.body.userId)
                    doc.usersDisliked.splice(userIndex, 1)

                    // ajout du like
                    doc.usersLiked.push(req.body.userId)

                    // Mise à jour du nombre de likes et de dislikes
                    doc.dislikes = doc.usersDisliked.length
                    doc.likes = doc.usersLiked.length

                    // Return
                    doc.save()
                    res.status(201).json(doc)
                }


                // DOUBLON DE LIKE
                else if (doc.usersLiked.includes(req.body.userId)){
                    res.status(401).json({message : "Vous n'êtes pas autorisé à liker deux fois"})
                }

                // CAS NOMINAL

                else {
                    // ajout du like
                    doc.usersLiked.push(req.body.userId)

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
                if (doc.usersLiked.includes(req.body.userId)) {
                    let userIndex = doc.usersLiked.indexOf(req.body.userId)
                    doc.usersLiked.splice(userIndex, 1)
                    doc.likes = doc.usersLiked.length // MAJ DU NOMBRE DE LIKES
                }
                
                // suppression de dislike
                else {
                    let userIndex = doc.usersDisliked.indexOf(req.body.userId)
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
                if (doc.usersLiked.includes(req.body.userId)) {

                    console.log("L'utilisateur est dans les likes");
                    let userIndex = doc.usersLiked.indexOf(req.body.userId)
                    doc.usersLiked.splice(userIndex, 1)

                    // Ajouter l'utilisateur à la liste de dislikes
                    doc.usersDisliked.push(req.body.userId)
                    
                    // Mise à jour du nombre de likes et de dislikes
                    doc.dislikes = doc.usersDisliked.length
                    doc.likes = doc.usersLiked.length

                    // Return
                    doc.save()
                    res.status(201).json(doc)
                }

                // Empêcher plusieurs dislike
                else if (doc.usersDisliked.includes(req.body.userId)){
                    res.status(401).json({message : "Vous n'êtes pas autorisé à disliker deux fois"})
                }

                // Cas nominal
                else {

                    // Ajouter l'utilisateur à la liste de dislikes
                    doc.usersDisliked.push(req.body.userId)
                    
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
// OK
const readOneSauce = (req, res) => {
    console.log(req.auth);
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
    Sauce.find()
    .then(sauces => res.json(sauces))
    .catch(err => console.log(err))
}


// UPDATE request
const updateSauce = (req, res) => {


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
                res.send(err)
            }
            else{
                res.status(201).json({message: "Sauce modifiée !"})
            }
        })
    }

    else {
        const sauceObject = JSON.parse(req.body.sauce)
        Sauce.findByIdAndUpdate(req.params.id, {
            name: sauceObject.name,
            description: sauceObject.description,
            mainPepper : sauceObject.mainPepper,
            heat : sauceObject.heat,
            manufacturer : sauceObject.manufacturer,
            userId : sauceObject.userId,
            imageUrl : `https://localhost:3000/images/${req.body.pathImage}`,
        }, (err, sauceModified) => {
            if(err){
                res.send(err)
            }
            else{
                res.status(201).json({message: "Sauce modifiée avec nouvelle image !"})
            }
        })
    }

}


// DELETE request
// OK
const deleteSauce = (req, res) => {

    Sauce.findOne({_id:req.params.id})
    .then(sauce => {
        
        let filename = sauce.imageUrl;
        filename = filename.split('/')
        filename = filename[filename.length - 1]

        let pathDelete = path.join(process.cwd(),'back/images/', filename)

        if (sauce.userId == req.auth.userId){
            fs.unlink(pathDelete, () => {
                console.log("Suppression autorisée");
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        }

        else {
            res.status(403).json({message : "Utilisateur non autorisé"})
            console.log("non autorisé");
        }

    })

    .catch(err => console.log(err))

}



module.exports = { 
    // CREATE
    createSauce,
    // READ
    readOneSauce,
    readAllSauces,
    // UPDATE
    updateSauce,
    updateLike,
    // DELETE
    deleteSauce,
}