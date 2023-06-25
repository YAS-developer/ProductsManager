require('dotenv').config()
const express = require('express')
const User = require('../models/user')
const authentification = require('../middlewares/authentification')
const router = new express.Router()

router.post('/api/users', async (req, res) => {
    const userCreated = new User(req.body)

    try{
        const authToken = await userCreated.generateAuthTokenAndSaveUser()
        const message = `L'utilisateur ${userCreated.email} a bien été créer.`
        res.json({message: message, data: {userCreated, authToken}})
    }
    catch(error){
        if(error.code === 11000){
            const message = "Cet email existe déjà."
            res.status(404).json({message: message, error: error})
        }
        else{
            const message = `Erreur lors de l'enregistrement de l'utilisateur.`
            res.status(500).json({message: message, error: error})
        }
       
    }
})

router.post("/api/users/login", async (req, res) => {
    try {
        const user = await User.findUser(req.body.email, req.body.password)
        const authToken = await user.generateAuthTokenAndSaveUser()
        const message = `l'utilisateur ${user.email} s'est connecté avec succès.`
        res.json({message : message, data: {user, authToken}})
    } 
    catch(error) {
        const message = "Erreur lors de la connexion."
        res.status(500).json(({message: message, error: error}))
    }
})

router.post("/api/users/logout", authentification, async (req, res) => {
    try {

    
        req.user.authTokens = req.user.authTokens.filter((authToken) =>{
            return authToken.authToken !== req.authToken
        })

        await req.user.save()
        const message = "L'utilisateur a bien été déconnecté."
        res.json({message: message})
    } 
    catch(error) {
        const message = "Erreur lors de la connexion."
        res.status(500).json(({message: message, error: error}))
    }
})

router.post("/api/users/logout/all", authentification, async (req, res) => {
    try {
        req.user.authTokens = []
        await req.user.save()
        const message = "L'utilisateur a bien été déconnecté."
        res.json({message: message})
    } 
    catch(error) {
        const message = "Erreur lors de la connexion."
        res.status(500).json(({message: message, error: error}))
    }
})

router.get('/api/users/me', authentification, (req, res) => {
    const message = "Voici les données de l'utilisateur connecté"
    res.json({message: message, data: req.user})
})

router.put('/api/users/me',  authentification, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        const message = "L'utilisateur connecté a été modifié avec succès."
        res.json({message: message, data: req.user})
    } 
    catch (error) {
        const message = "Erreur lors de la modification d'un utilisateur."
        res.json({message: message, error: error})
    }

})


router.delete('/api/users/me', authentification, async (req, res) => {
    try{
        await User.deleteOne(req.user)
        const message = "L'utilisateur connecté a été supprimé avec succès."
        res.json({message: message, data: req.user})
    }
    catch(error){
        const message = "Erreur lors de la suppression d'un utilisateur"
        res.status(500).json({ message: message, error: error });
    }
})




module.exports = router






