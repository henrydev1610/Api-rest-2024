const {Router} = require('express')
const router = Router()

const userController = require('../Controller/UserController')




const user = new userController()






router.get('/', user.create)
router.put('/:id', user.update)






module.exports = router





