const express = require("express");
const router = express.Router()
const controller = require('../controllers/sauceController')


router.route('/')
.get(controller.readAllSauces) // READ Lecture du tableau de sauces
.post(controller.createSauce) // CREATE Enregistrement d'une sauce


router.route('/:id')
.get(controller.readOneSauce) // READ Sauce spécifique
.put(controller.updateSauce) // UPDATE modification d'une sauce
.delete(controller.deleteSauce) // DELETE suppression d'une sauce

// LIKE : id de la sauce dans les paramètres d'url
router.post('/:id/like', controller.updateLike)


module.exports = router;
