const path = require("path")

// CREATE request
const createSauce = (req, res) => {
    res.send("Enregistrement d'une sauce avec une image associée")
}

const updateLike = (req, res) => {
    res.send("Mise à jour du like")
}


// READ request
const readOneSauce = (req, res) => {
    res.send("Lecture d'une sauce spécifique via le id")
}

const readAllSauces = (req, res) => {
    res.send("Lecture de la liste des sauces")
}


// UPDATE request
const updateSauce = (req, res) => {
    res.send("Modification d'une sauce")
}


// DELETE request
const deleteSauce = (req, res) => {
    res.send("Suppression d'une sauce")
}



module.exports = { 
    readOneSauce,
    readAllSauces,
    updateLike,
    deleteSauce,
    updateSauce,
    createSauce,
}