import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { addLink, deleteLink } from '../controllers/ytController.js'

const ytLinkRouter = express.Router({ mergeParams: true })

ytLinkRouter.post('/addLink', userAuth, addLink)
ytLinkRouter.delete('/deleteLink/:id', userAuth, deleteLink)

export default ytLinkRouter