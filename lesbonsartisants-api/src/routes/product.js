const express = require('express')
const Product = require('../models/product')
const authentification = require('../middlewares/authentification')
const router = new express.Router()


const getUniqueId = (products) => { 
    const productsIds = products.map(product => product._id)
    const maxId = productsIds.reduce((a,b) => Math.max(a,b))
    const uniqueId = maxId+1
    return uniqueId
}

//cree un produit
router.post('/api/products', authentification, async (req,res)=>{
    try{
        const products = await Product.find({})

        let id = 0

        if(products.length === 0){
            id = 1
        }
        else{
            id = getUniqueId(products)    
        }

        const productCreated = {_id: id,...req.body}
        try{
            const newProduct = new Product(productCreated)
            await newProduct.save()
            const message = `Le produit ${productCreated.name} a bien été créer.`
            res.json({message: message, data: {productCreated}})
        }
        catch(error){
            const message = "Erreur lors de l'insertion d'un produit."
            res.status(500).json({message: message, error: error})
        }
    }
    catch(error){
        const message = "Erreur lors de la recherche d'un produit."
        res.status(500).json({message: message, error: error})
    }
})


// recuperer tout les produits
router.get('/api/products', authentification, async(req,res)=>{
    try{
        const products = await Product.find({})
        let message = ""
        
        if(products.length === 0){
            message = "La liste des produits est vide. Veuillez créer des produits pour pouvoir récupérer la liste des produits."
            res.json({message: message}) 
        }
        else if(products.length === 1){
            message = "Le produit a bien été récuperé." 
        }
        else{
            message = "La liste des produits a bien été recuperée."
        }
        res.json({message: message, data: products})
    }
    catch(error){
        const message = "Erreur lors de la recherche d'une liste de produits."
        res.statuts(500).json({message: message, error: error});
    }
})




// recuperer un produit
router.get('/api/products/:id', authentification, async (req,res) => {
    try{
        const id =  parseInt(req.params.id)
        const productFinded = await Product.findById(id)
        if(productFinded){
            const message = "Le produit a bien été trouvé."
            res.json({message: message, data: productFinded});
        }
        else{
            const message = "Produit inexistant."
            res.status(404).json({message: message});
        }
    }
    catch(error){
        const message = 'Erreur lors de la recherche du produit.';
        res.status(500).json({message: message, error: error});
    }    
})  


// modifier un produit
router.put(`/api/products/:id`, authentification, async (req,res)=>{
    const id = parseInt(req.params.id)
    try{
        const productUpdated = await Product.findById({_id:id})

        if(!productUpdated){
            const message = 'Produit inexistant.'
            res.status(404).json({message})
        }
        else{
            const update = {...req.body}

            try{
                await Product.findByIdAndUpdate(id, req.body)
                const message = `Le produit ${productUpdated.name} a bien été modifié.`
                res.json({message: message, data: update})
            }
            catch(error){
                const message = "Erreur lors de la modification d'un produit."
                res.status(500).json({message: message})
            }
        }
        
    }
    catch(error){
        const message = "Erreur lors de la recherche d'un produit."
        res.status(500).json({message: message, error: error})
    }
})


// supprimer un produit
router.delete(`/api/products/:id`, authentification, async (req,res)=>{
    const id = parseInt(req.params.id)
    try{
        const productDeleted = await Product.findById(id)
        if(productDeleted){
            try{
                await Product.findByIdAndDelete(id)
                const message = `Le produit ${productDeleted.name} a bien été supprimé.`
                res.json({message: message, data: productDeleted})
            }
            catch(error){
                const message = "Erreur lors de la suppression d'un produit."
                res.status(500).json({message: message, error: error})
            }
        }
        else{
            const message = 'Produit inexistant.'
            res.status(404).json({message: message})
        }
        
    }        
    catch(error){
        const message = "Erreur lors de la rechercche d'un produit."
        res.status(500).json({message: message, error: error})
    }
})


module.exports = router

