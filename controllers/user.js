
import Tasks from "../models/task.js";

const index = async (req, res) => {
    try {
        const task = await Tasks.find({userid: req.userId})
        res.json({ data: task, message: 'Tasks fetched successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


const create = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: 'Task text is required' });
        }
        const existingTask = await Tasks.findOne({ text: req.body.text, userid: req.userId });

        const task = await Tasks.create({ text: req.body.text, userid: req.userId});
        res.status(200).json({
            data: task,
            message: 'Task created successfully'
        });
    } catch (err) {
        res.status(400).json({
            message: 'Bad request',
            error: err.message
        });
    }
};



const update = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.userid.toString() !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if(req.body.text) task.text = req.body.text;
        if(req.body.text) task.completed = req.body.completed;
        await task.save();

        res.status(200).json({ data: task, message: 'Task updated successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Bad request', error: err.message });
    }
};





const remove = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userid.toString() !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await task.deleteOne();

        res.json({ message: 'Task deleted successfully' });
        
    } catch (err) {
        res.status(400).json({ message: 'Bad request', error: err.message });
    }
};


// Remove all tasks for a user
const removeAll = async (req, res) => {
    try {
        const result = await Tasks.deleteMany({ userid: req.userId }); 

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }

        res.json({ 
            message: 'All tasks deleted successfully', 
            deletedCount: result.deletedCount 
        });

    } catch (err) {
        res.status(500).json({ 
            message: 'Server error', 
            error: err.message 
        });
    }
};




export {
    index,
    create,
    update,
    remove,
    removeAll
};



