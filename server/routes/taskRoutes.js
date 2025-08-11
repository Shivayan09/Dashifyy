import express from 'express'
import { addTask, deleteTask, editTask, getTasks, toggleTaskCompletion } from '../controllers/taskController.js'
import userAuth from '../middlewares/userAuth.js'

const taskRouter = express.Router()

taskRouter.post('/addTask', userAuth, addTask)
taskRouter.get('/getTasks', userAuth, getTasks)
taskRouter.put('/editTask/:id', userAuth, editTask)
taskRouter.put('/taskStatus/:id', userAuth, toggleTaskCompletion)
taskRouter.delete('/deleteTask/:id', userAuth, deleteTask)

export default taskRouter