import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { addRoutine, deleteRoutine, editRoutine, getRoutine } from '../controllers/routineController.js'

const routineRouter = express.Router()

routineRouter.post('/addRoutine', userAuth, addRoutine)
routineRouter.get('/getRoutine', userAuth, getRoutine)
routineRouter.delete('/deleteRoutine/:id', userAuth, deleteRoutine)
routineRouter.put('/editRoutine/:id', userAuth, editRoutine)

export default routineRouter