require('express-async-errors');
const express = require('express')
const app = express()

const migrationsRun = require("./src/Database/Migrations")
const router = require('./src/Routes')
const AppError = require('./src/Utils/AppError')

const port = 5551


app.use(express.json())
app.use(router)

migrationsRun()



app.use((error, req, res, next)=>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message 
        })  
    }

    console.error(error)

    return res.status(500).json({
        status : "error", 
        message: "Inernal Server Error"
    })

})






app.listen(port, ()=> console.log('server running into http://localhost:5551'))