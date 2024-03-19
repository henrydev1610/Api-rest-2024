const {Router} = require ('express')
const route  = Router()

const NotesController = require('../Controller/NotesController')

const notes = new NotesController()



route.post('/:user_id', notes.create)





module.exports = route