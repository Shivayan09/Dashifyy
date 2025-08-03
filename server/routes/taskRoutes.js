import express from 'express'
import { addTask, deleteTask, getTasks } from '../controllers/taskController.js'
import userAuth from '../middlewares/userAuth.js'

const taskRouter = express.Router()

taskRouter.post('/addTask', userAuth, addTask)
taskRouter.get('/getTasks', userAuth, getTasks)
taskRouter.delete('/deleteTask/:id', userAuth, deleteTask)

export default taskRouter