// Based one:
// https://expressjs.com/en/guide/routing.html
const express = require('express');
const router = express.Router();

const mysqlQuery = require('./db');

// GET /tasks
router.get('/', async function (req, res) {
    console.log("Handling request to search tasks");
    const tasks = await mysqlQuery('select * from tasks');
    res.send(tasks);
});

router.get('/wireframe/', function (req, res) {
    console.log("Handling request to search tasks");
    // Return all tasks
    // res.send(tasks);
});

// GET /tasks/:id
router.get('/:id', async function (req, res) {
    console.log("Handling request to search tasks");
    const result = await mysqlQuery(`select * from tasks where id = ${req.params.id}`);    
    if (!result.length){
        res.status(404).send({message: "Task not found"});
        return;
    }

    // Return the task
    res.send(result[0]);
});

// DELETE /tasks/:id
router.delete('/:id', async function (req, res) {
    console.log("Deleting task");
    const result = await mysqlQuery(`select * from tasks where id = ${req.params.id}`);
    if (!result.length){
        res.status(404).send({message: "Task not found"});
        return;
    }

    await mysqlQuery(`delete from tasks where id = ${req.params.id}`);
    // Return the task
    res.status(204).send();
});

// POST /tasks
router.post('/', function (req, res) {
    console.log("Creating task");
    const task = req.body;
    if (!task.name) {
        res.status(400).send({message: "Task must have a name"});
        return;
    }
    // Add the task
    task.id = tasks.length + 1;
    tasks.push(task);
    res.status(201).send(task);
});

// PUT /tasks/:id
router.put('/:id', async function (req, res) {
    console.log("Updating task");
    const result = await mysqlQuery(`select * from tasks where id = ${req.params.id}`);   
    const id = parseInt(req.params.id);
    const task = req.body;
    if (!task.name) {
        res.status(400).send({message: "Task must have a name"});
        return;
    }
    const targetIndex = tasks.findIndex((tasks) => tasks.id === id);
    if (targetIndex === -1) { // -1 means not found
        res.status(404).send({message: "Task not found"});
        return;
    }
    // Update the task
    tasks[targetIndex] = task;
    res.status(200).send(task);
});

//DELETE /allTasks
router.delete('/', async function (req, res) {
    console.log("Deleting all tasks");
    tasks.splice(0, tasks.length);
    res.status(204).send();
});


module.exports = router;