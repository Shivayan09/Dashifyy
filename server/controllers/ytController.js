import youtubeLinkModel from "../models/ytLinkModel.js"

export const addLink = async (req, res) => {
    const subjectId = req.params.subjectId
    const { heading, url } = req.body
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
        const existing = await youtubeLinkModel.findOne({url})
        if(existing) {
            return res.json({
                success: false,
                message: "Link is already added"
            })
        }
        const newLink = new youtubeLinkModel({ subjectId, heading, url })
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