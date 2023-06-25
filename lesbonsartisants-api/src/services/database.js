require('dotenv').config()
const  mongoose =  require('mongoose')



const connectDb = async () =>{
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connexion reussie')
}

const closeDb = async() =>{
    await mongoose.close()
    console.log('deconnexion reussie')
    return "done"
}

module.exports = {connectDb, closeDb, mongoose}