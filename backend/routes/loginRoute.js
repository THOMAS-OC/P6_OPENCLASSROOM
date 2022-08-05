const express = require("express");
const router = express.Router()
const controller = require('../controllers/loginController')
const passVlidator = require("../middlewares/passValidator")
const mailValidator = require("../middlewares/mailValidator")
// Limitation du nombre de requete pour une même ip
const rateLimit = require('express-rate-limit')

const connectAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Dépassement du nombre de tentatives de connexion, IP bloqué pour 1h.',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 3, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.post('/login', connectAccountLimiter, controller.login)

router.post('/signup', mailValidator, passVlidator, createAccountLimiter, controller.signup)

module.exports = router;