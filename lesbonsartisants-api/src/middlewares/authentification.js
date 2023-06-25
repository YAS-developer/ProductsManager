const User = require('../models/user')
const jwt = require('jsonwebtoken')

const authentification = async(req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '')
        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(authToken, process.env.SECRET_WORD)
        console.log(decodedToken)
        const user = await User.findOne({_id: decodedToken._id, 'authTokens.authToken': authToken})
        
        if(!user) throw new Error()

        req.authToken = authToken
        req.user = user
        next()
    }
    catch (error) {
        const message = "Veuillez vous authentifier."
        res.status(401).json({message: message})
    }
}

module.exports = authentification