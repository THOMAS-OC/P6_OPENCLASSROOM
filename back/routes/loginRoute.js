const express = require("express");
const router = express.Router()

//  ok
router.post('/login', (req, res)=>{
    res.send("route de login")
})

// ok
router.post('/signup', (req, res)=>{
    res.send("route d'inscription")
})

module.exports = router;