const express = require("express");
const router = express.Router()
const controller = require('../controllers/sauceController')
const authJwt = require("../authJwt")
const multer = require("multer")
const path = require("path")

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


router.route('/')
.get(authJwt, controller.readAllSauces) // READ Lecture du tableau de sauces
.post(authJwt, upload.single('image'), controller.createSauce) // CREATE Enregistrement d'une sauce


router.route('/:id')
.get(authJwt, controller.readOneSauce) // READ Sauce spécifique
.put(controller.updateSauce) // UPDATE modification d'une sauce
.delete(authJwt, controller.deleteSauce) // DELETE suppression d'une sauce

// LIKE : id de la sauce dans les paramètres d'url
router.post('/:id/like', controller.updateLike)


module.exports = router;
