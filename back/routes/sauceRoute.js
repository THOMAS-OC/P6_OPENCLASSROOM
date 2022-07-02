const express = require("express");
const router = express.router();

// READ Tableau des sauces
router.get('/api/sauces', ()=>{
    res.send("Liste des sauces")
})

// READ Sauce spécifique
router.get('/:id', ()=>{
    res.send("Lecture d'une sauce spécifique via id")
})

// CREATE Enregistrement d'une sauce
router.post('/api/sauces', ()=>{
    res.send("Enregistrement d'une sauce avec une image associé")
})

// UPDATE modification d'une sauce
router.put('/:id', ()=>{
    res.send("Modification d'une sauce")
})

// DELETE suppression d'une sauce
router.delete('/:id', ()=>{
    res.send("Suppression d'une sauce")
})

// CREATE mise à jour du like
router.post('/:id/like', ()=>{
    res.send("Mise à jour du like")
})