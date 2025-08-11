import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { addLink } from '../controllers/ytController.js'

const ytLinkRouter = express.Router({ mergeParams: true })

ytLinkRouter.post('/', userAuth, addLink)

export default ytLinkRouter