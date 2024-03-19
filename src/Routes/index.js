const {Router} = require('express')
const router = Router()
const userRouter = require('./users.routes')
const noteRouter = require('./notes.routes')



router.use('/create', userRouter)
router.use('/notes', noteRouter)



module.exports = router







 