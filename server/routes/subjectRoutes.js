import express from 'express'
import { addSubject, deleteSubject, editSubject, getSubjects } from '../controllers/subjectController.js'
import userAuth from '../middlewares/userAuth.js'

const subjectRouter = express.Router()

subjectRouter.post('/addSubject', userAuth, addSubject)
subjectRouter.delete('/deleteSubject/:id', userAuth, deleteSubject)
subjectRouter.get('/getSubjects', userAuth, getSubjects)
subjectRouter.put('/editSubject/:id', userAuth, editSubject)

export default subjectRouter