require('dotenv').config()
const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(v){    
            if(!validator.isEmail(v)) throw new Error("Veuillez mettre un email valide.")
        }
    },
    password:{
        type: String,
        required: true,
        validate(v){
            if(!validator.isLength(v, {min: 8, max: undefined})) throw new Error("Le mot de passe doit avoir au minimum 8.")
        }
    },
    authTokens:[{
        authToken:{
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function(){
    const user = this.toObject();

    delete user.password
    delete user.authTokens
    delete user.__v

    return user

}

userSchema.methods.generateAuthTokenAndSaveUser =  async function(){
    // eslint-disable-next-line no-undef
    const authToken = jwt.sign({_id: this._id.toString()}, process.env.SECRET_WORD)
    this.authTokens.push({authToken})
    await this.save()
    return authToken
}

userSchema.statics.findUser = async (email, password) =>{

    const user = await User.findOne({email: email})
    if(!user) throw new Error('Erreur, impossible de se connecter.')
    
    const isPasswordValid =  await bcrypt.compare(password, user.password)
    if(!isPasswordValid) throw new Error('Erreur, impossible de se connecter.')

    return user
}

userSchema.pre('save', async function(){
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8)
})



const User = mongoose.model('User', userSchema)


module.exports = User