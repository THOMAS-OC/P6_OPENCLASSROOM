const express = require("express");
const router = express.Router()

// READ Tableau des sauces OK
router.get('/', (req, res)=>{
    res.send("Liste des sauces")
})

// READ Sauce spécifique : OK
router.get('/:id', (req, res)=>{
    res.send("Lecture d'une sauce spécifique via le id")
})

// CREATE Enregistrement d'une sauce : OK
router.post('/', (req, res)=>{
    res.send("Enregistrement d'une sauce avec une image associée")
})

// UPDATE modification d'une sauce : OK
router.put('/:id', (req, res)=>{
    res.send("Modification d'une sauce")
})

// DELETE suppression d'une sauce : OK
router.delete('/:id', (req, res)=>{
    res.send("Suppression d'une sauce")
})

// CREATE mise à jour du like : OK
router.post('/:id/like', (req, res)=>{
    res.send("Mise à jour du like")
})

module.exports = router;