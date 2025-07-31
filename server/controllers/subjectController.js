import subjectModel from "../models/subjectModel.js"

export const addSubject = async (req, res) => {
    const { name, code, credit, userId } = req.body
    if (!name) {
        return res.json({
            success: false,
            message: "Subject name is required"
        })
    }
    if (!code) {
        return res.json({
            success: false,
            message: "Subject code is required"
        })
    }
    if (!credit) {
        return res.json({
            success: false,
            message: "Credit point is required"
        })
    }
    try {
        const existingSubject = await subjectModel.findOne({ name })
        if (existingSubject) {
            return res.json({
                success: false,
                message: "Subject is already added"
            })
        }
        const subject = new subjectModel({ name, code, credit, userId})
        await subject.save()
        return res.status(200).json({
            success: true,
            message: "Subject added"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getSubjects = async (req, res) => {
    const { userId } = req.body;
    try {
        const subjects = await subjectModel.find({ userId });
        if(!subjects) {
            return res.json({
                success: false,
                message: "No subjects found!"
            })
        }
        return res.status(200).json({
            success: true,
            subjects
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const editSubject = async(req, res) => {
    const subjectId = req.params.id
    const {name, code, credit} = req.body
    if(!name) {
        return res.json({
            success: false,
            message: "Enter a name!"
        })
    }
    if(!code) {
        return res.json({
            success: false,
            message: "Enter a code!"
        })
    }
    if(!credit) {
        return res.json({
            success: false,
            message: "Enter credits!"
        })
    }
    try {
        const updated = await subjectModel.findByIdAndUpdate(
            subjectId, {name, code, credit}, {new: true}
        )
        if(!updated) {
            return res.json({
                success: false,
                message: "Could not save changes"
            })
        }
        res.status(200).json({
            success: true,
            message: "Changes saved!"
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteSubject = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.json({
            success: false,
            message: "Subject not found!"
        })
    }
    try {
        const deletedSubject = await subjectModel.findByIdAndDelete(id)
        if (!deletedSubject) {
            return res.json({
                success: false,
                message: "Subject not found!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Subject deleted"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}