const express = require('express')

const cors = require('cors')

// const logic = require('./services/logic')

const db = require('./service/db')

const server = express()

server.use(cors({
    origin: 'http://localhost:3000'
}))

server.use(express.json())

server.listen(8001, () => {
    console.log('server listening on port 8001');
})

server.post('/tasks', async (req, res) => {
    try {
        const { id, taskHeading, taskPriority, taskDescription, endDate, status } = req.body;
        console.log(status);


        if (!id || !taskHeading || !taskPriority || !taskDescription || !endDate) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const newTask = new db.Task({
            task_id: id,
            task_heading: taskHeading,
            task_priority: taskPriority,
            task_description: taskDescription,
            end_date: endDate,
            task_status: status
        });

        await newTask.save();

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Task added successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
})

server.get('/get-tasks', async (req, res) => {
    try {

        const totalTasks = await db.Task.find();

        res.status(200).json({
            status: true,
            statusCode: 200,
            tasks: totalTasks,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
})

server.delete('/delete-task/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const deletedTask = await db.Task.deleteOne({task_id: id});

        if(!deletedTask) {
            res.status(404).json({
                status: flase,
                statusCode: 404,
                message: "No Task found"
            });
        }

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Task Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
})

server.put('/update-task/:id', async (req, res) => {
    try {
        
        const {id} = req.params;
        const { taskHeading, taskDescription, taskStatus, endDate } = req.body;

        const updatedTask = await db.Task.findOne({task_id: id});
        // console.log(updatedTask);
        

        if(!updatedTask) {
            res.status(404).json({
                status: flase,
                statusCode: 404,
                message: "No Task found"
            });
        } else {
            updatedTask.task_id = id
            updatedTask.task_heading = taskHeading
            updatedTask.task_description = taskDescription
            updatedTask.task_status = taskStatus
            updatedTask.end_date = endDate

            updatedTask.save();

            res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Task Updated Successfully"
            });
        }
        

    } catch (error) {
        
    }
})