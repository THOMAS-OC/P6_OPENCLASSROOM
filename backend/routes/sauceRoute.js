const express = require("express");
const router = express.Router()
const controller = require('../controllers/sauceController')
const authJwt = require("../middlewares/authJwt")
const sauceValidator = require("../middlewares/sauceValidator")
const deleteImage = require("../middlewares/deleteImage")
const multer = require("multer")
const path = require("path")

// GESTION DES FICHIERS IMAGES
const upload = multer(
  
    {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join( __dirname, '../images'));
        },
        filename: (req, file, cb) => {
          req.body.pathImage = Date.now() + '-' + file.originalname
          cb(null, Date.now() + '-' + file.originalname);
        }
      })
});

// Limitation du nombre de requete pour une même ip
const rateLimit = require('express-rate-limit')

const createAndUpdateLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Attention, vous ne pouvez créer ou modifier une sauce que 10 fois par heure',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


router.route('/')
.get(authJwt, controller.readAllSauces) // READ Lecture du tableau de sauces
.post(authJwt, createAndUpdateLimiter, upload.single('image'), sauceValidator, controller.createSauce) // CREATE Enregistrement d'une sauce


router.route('/:id')
.get(authJwt, controller.readOneSauce) // READ Sauce spécifique
.put(authJwt, createAndUpdateLimiter, upload.single('image'), deleteImage, controller.updateSauce) // UPDATE modification d'une sauce
.delete(authJwt, deleteImage, controller.deleteSauce) // DELETE suppression d'une sauce

// LIKE : id de la sauce dans les paramètres d'url
router.post('/:id/like', controller.updateLike)


module.exports = router;
