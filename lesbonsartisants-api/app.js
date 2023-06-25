const { connectDb, closeDb } = require('./src/services/database')
const userRoutes = require('./src/routes/user')
const productRoutes = require('./src/routes/product')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// const cors = require('cors')

connectDb()
    .catch(console.error)
    .finally(()=> closeDb)


const app = express()

// eslint-disable-next-line no-undef
const port = process.env.PORT || process.env.LOCAL_PORT
   
app
    // eslint-disable-next-line no-undef
    .use(favicon(__dirname+'/favicon.ico'))
    .use(bodyParser.json())
    // .use(cors)
    .use(userRoutes)
    .use(productRoutes)
    //ressource inexistante.
    .use(({res}) =>{
        const message = "impossible de trouver la resource demandée. Veuillez essayer une autre URL."
        res.status(404).json(message)
    })

    

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

