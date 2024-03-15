const {Router} = require('express')
const router = Router()
const userRouter = require('./users.routes')




router.use('/create', userRouter)


module.exports = router







 