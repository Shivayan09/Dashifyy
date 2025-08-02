import taskModel from "../models/taskModel"

export const addTask = async(req, res) => {
    const {task} = req.body
    if(!task) {
        return res.json({
            success: false,
            message: "Task name is required"
        })
    }
    try {
        const existingTask = await taskModel.findOne({task})
        if(existingTask) {
            return res.json({
                success: false,
                message: "Task already exists!"
            })
        }
        const newTask = new taskModel({task})
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