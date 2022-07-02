const express = require("express");
const router = express.router();

router.post('/api/auth/login', ()=>{
    res.send("route de login")
})

router.post('/api/auth/signup', ()=>{
    res.send("route d'inscription")
})
