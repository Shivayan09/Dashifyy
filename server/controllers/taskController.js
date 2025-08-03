import taskModel from "../models/taskModel"

export const addTask = async(req, res) => {
    const {task, userId} = req.body
    if(!task) {
        return res.json({
            success: false,
            message: "Task name is required"
        })
    }
    try {
        const existingTask = await taskModel.findOne({task, userId})
        if(existingTask) {
            return res.json({
                success: false,
                message: "Task already exists!"
            })
        }
        const newTask = new taskModel({task, userId})
        await newTask.save();
        return res.status(200).json({
            success: true,
            message: "Task added successfully!"
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getTasks = async(req, res) => {
    const {userId} = req.body;
    try {
        const tasks = await taskModel.find({userId})
        if(!tasks) {
            return res.json({
                success: false,
                message: "Task not found"
            })
        }
        return res.status(200).json({
            success: false,
            tasks
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteTask = async(req, res) => {
    const {id} = req.params
    if(!id) {
        return res.json({
            success: false,
            message: "Task not found!"
        })
    }
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if(!deletedTask) {
            return res.json({
                success: false,
                message: "Task not found!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        })
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}