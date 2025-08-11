import subjectModel from "../models/subjectModel.js"
import youtubeLinkModel from "../models/ytLinkModel.js"

export const addLink = async (req, res) => {
    const subjectId = req.params.subjectId
    const { heading, url, userId } = req.body
    if(!userId) {
        return res.json({
            success: false,
            message: "User doesn't exist, login again!"
        })
    }
    if (!subjectId) {
        return res.json({
            success: false,
            message: "Subject does not exist here!"
        })
    }
    if (!heading) {
        return res.json({
            success: false,
            message: "Heading is required"
        })
    }
    if (!url) {
        return res.json({
            success: false,
            message: "Url is required"
        })
    }
    try {
        const existing = await youtubeLinkModel.findOne({url, userId})
        if(existing) {
            return res.json({
                success: false,
                message: "Link is already added"
            })
        }
        const newLink = new youtubeLinkModel({ subjectId, heading, url, userId })
        await newLink.save();
        return res.status(200).json({
            success: true,
            message: "Link added successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getLinks = async(req, res) => {
    const {userId} = req.body
    const subjectId = req.params.subjectId
    const subject = await subjectModel.findById(subjectId);
    try {
        const links = await youtubeLinkModel.find({userId})
        if(!links) {
            return res.json({
                success: false,
                message: "No links found"
            })
        }
        return res.status(200).json({
            success: true,
            links,
            subject: { _id: subject._id, name: subject.name }
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteLink = async(req, res) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        if(!id) {
            return res.json({
                success: false,
                message: "Link not found"
            })
        }
        const deleted = await youtubeLinkModel.findByIdAndDelete(id, {userId})
        if(!deleted) {
            return res.json({
                success: false,
                message: "Could not delete link"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Link deleted successfully"
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}