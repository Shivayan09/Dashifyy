import routineModel from "../models/routineModel.js"

export const addRoutine = async(req, res) => {
    const {subject, start, end, location, userId, day } = req.body
    if(!subject) {
        return res.json({
            success: false,
            message: "Subject is required"
        })
    }
    if(!start) {
        return res.json({
            success: false,
            message: "Add a start time"
        })
    }
    if(!end) {
        return res.json({
            success: false,
            message: "Add an end time"
        })
    }
    if(!day) {
        return res.json({
            success: false,
            message: "Day is required"
        })
    }
    if(start>12 || start<1) {
        return res.json({
            success: false,
            message: "Enter start time in 12 hr format"
        })
    }
    if(end>12 || end<1) {
        return res.json({
            success: false,
            message: "Enter end time in 12 hr format"
        })
    }
    try {
        const existing = await routineModel.findOne({subject, day, userId})
        if(existing) {
            return res.json({
                success: false,
                message: "Already added!"
            })
        }
        const routine = new routineModel({subject, start, end, location, day, userId})
        await routine.save()
        return res.status(200).json({
            success: true,
            message: "Added into routine!"
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getRoutine = async(req, res) => {
    const {userId} = req.body
    try {
        const routines = await routineModel.find({userId})
        if(!routines) {
            return res.json({
                success: false,
                message: "No routine found!"
            })
        }
        return res.status(200).json({
            success: true,
            routines
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const editRoutine = async(req, res) => {
    const routineId = req.params.id
    const {subject, start, end, location} = req.body
    if(!subject) {
        return res.json({
            success: false,
            message: "Subject is required"
        })
    }
    if(!start) {
        return res.json({
            success: false,
            message: "Start time is required"
        })
    }
    if(!end) {
        return res.json({
            success: false,
            message: "End time is required"
        })
    }
    if(start>12) {
        return res.json({
            success: false,
            message: "Enter start time in 12 hr format"
        })
    }
    if(end>12) {
        return res.json({
            success: false,
            message: "Enter end time in 12 hr format"
        })
    }
    try {
        const updated = await routineModel.findByIdAndUpdate(routineId, {subject, start, end, location}, {new: true})
        if(!updated) {
            return res.json({
                success: false,
                message: "Couldn't save changes!"
            })
        }
        return res.status(200).json({
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

export const deleteRoutine = async(req, res) => {
    const {id} = req.params
    if(!id) {
        return res.json({
            success: false,
            message: "Routine not found!"
        })
    }
    try {
        const deletedRoutine = await routineModel.findByIdAndDelete(id)
        if(!deletedRoutine) {
            return res.json({
                success: false,
                message: "Routine not found!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Routine deleted"
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}