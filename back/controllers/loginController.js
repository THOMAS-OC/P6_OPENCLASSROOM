const path = require("path")

// CREATE request
const login = (req, res) => {
    res.send("Connexion")
}

const signup = (req, res) => {
    res.send("Inscription")
}

module.exports = { 
    login,
    signup,
}