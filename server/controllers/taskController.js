import taskModel from "../models/taskModel.js"

export const addTask = async (req, res) => {
    const { task, userId } = req.body
    if (!task) {
        return res.json({
            success: false,
            message: "Task name is required"
        })
    }
    try {
        const existingTask = await taskModel.findOne({ task, userId })
        if (existingTask) {
            return res.json({
                success: false,
                message: "Task already exists!"
            })
        }
        const newTask = new taskModel({ task, userId })
        await newTask.save();
        return res.status(200).json({
            success: true,
            message: "Task added successfully!"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getTasks = async (req, res) => {
    const { userId } = req.body;
    try {
        const tasks = await taskModel.find({ userId })
        if (!tasks) {
            return res.json({
                success: false,
                message: "Task not found"
            })
        }
        return res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const editTask = async (req, res) => {
    const taskId = req.params.id
    const { task } = req.body
    if (!task) {
        return res.json({
            success: false,
            message: "Enter a task!"
        })
    }
    try {
        const updated = await taskModel.findByIdAndUpdate(taskId, { task }, { new: true })
        if (!updated) {
            return res.json({
                success: false,
                message: "Couldn't update task"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Task updated successfully!"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const toggleTaskCompletion = async (req, res) => {
    const taskId = req.params.id;
    const { isCompleted } = req.body;

    if (typeof isCompleted !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: "isCompleted boolean is required"
        });
    }

    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            { isCompleted },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Task marked as ${isCompleted ? 'completed' : 'not completed'}`,
            task: updatedTask
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteTask = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.json({
            success: false,
            message: "Task not found!"
        })
    }
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.json({
                success: false,
                message: "Task not found!"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}