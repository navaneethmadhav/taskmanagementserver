const mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost:27017/TaskManagement')

const Task = mongoose.model('Task',{
    task_id:String,
    task_heading: String,
    task_priority: String,
    task_description: String,
    end_date: String,
    task_status: String
})

module.exports = {
    Task
}