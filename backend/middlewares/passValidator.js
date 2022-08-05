const passwordValidator = require('password-validator');

// Create a passwordSchema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', "azerty", "AZERTY"]); // Blacklist these values

module.exports = (req, res, next) => {

    let password = req.body.password

    if (passwordSchema.validate(password)){
        next()
    }
    else {
        res.status(400).json({message : "Mot de passe non conforme aux règles de sécurité !"})
    }

};
