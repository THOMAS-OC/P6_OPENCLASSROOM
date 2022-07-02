const express = require("express");
const router = express.Router()
const controller = require('../controllers/sauceController')

// READ Tableau des sauces OK
router.get('/', controller.readAllSauces)

// READ Sauce spécifique : OK
router.get('/:id', controller.readOneSauce)

// CREATE Enregistrement d'une sauce : OK
router.post('/', controller.createSauce)

// UPDATE modification d'une sauce : OK
router.put('/:id', controller.updateSauce)

// DELETE suppression d'une sauce : OK
router.delete('/:id', controller.deleteSauce)

// CREATE mise à jour du like : OK
router.post('/:id/like', controller.updateLike)

module.exports = router;