const mongoose  = require('mongoose')
const validator = require('validator')



const productSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        validate(v){
            if(v <= 0) throw new Error("L'id doit être positif.")
        }
    },
    name: {
        type: String,
        required: true,
        validate(v){
            if(!validator.isLength(v, {min: 4, max:30})) throw new Error("Le nom du produit doit être entre 4 et 30 caractères.")
        }
    },
    type: {
        type: String,
        required: true,
        validate(v){
            if(!validator.isLength(v, {min: 2, max:20})) throw new Error("Le type du produit doit être entre 2 et 20 caractères.")
        }
    },
    price: {
        type: Number,
        required: true,
        validate(v){
            if(v < 0) throw new Error("Le prix doit être positif ou nulle.")
        }
    },
    rating: {
        type: Number,
        required: true,
        validate(v){
            if(v < 0) throw new Error("La notation doit être positive ou nulle.")
        }
    },
    warranty_years: {
        type: Number,
        required: true,
        validate(v){
            if(v < 0) throw new Error("La garantie doit être positive ou nulle.")
        }
    },
    available: {
        type: Boolean,
        required: true
    },
})


productSchema.method.toJSON = function(){
    const product = this.toObject();
    
    delete product.__v
    
    return product
}

const Product = mongoose.model('Product', productSchema)

module.exports = Product