// Based one:
// https://expressjs.com/en/guide/routing.html
const express = require('express');
const router = express.Router();

/** @type{{id: number, name: string, done: boolean}[]} */
const tasks = [
    {id: 1, name: "some name 1", done: false},
    {id: 2, name: "some name 2", done: false},
    {id: 3, name: "some name 3", done: false},
    {id: 4, name: "some name 4", done: false},
];

// GET /tasks
router.get('/', function (req, res) {
    console.log("Handling request to search tasks");
    // Return all tasks
    res.send(tasks);
});

router.get('/wireframe/', function (req, res) {
    console.log("Handling request to search tasks");
    // Return all tasks
    // res.send(tasks);
});

// GET /tasks/:id
router.get('/:id', function (req, res) {
    console.log("Handling request to search tasks");
    const id = parseInt(req.params.id);
    const targetTask = tasks.find((tasks) => tasks.id === id);
    if (!targetTask) {
        res.status(404).send({message: "Task not found"});
        return;
    }
    // Return the task
    res.send(targetTask);
});

// DELETE /tasks/:id
router.delete('/:id', function (req, res) {
    console.log("Deleting task");
    const id = parseInt(req.params.id);
    const targetIndex = tasks.findIndex((tasks) => tasks.id === id);
    if (targetIndex === -1) { // -1 means not found
        res.status(404).send({message: "Task not found"});
        return;
    }
    // Remove the task
    tasks.splice(targetIndex, 1);
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
router.put('/:id', function (req, res) {
    console.log("Updating task");
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
router.delete('/', function (req, res) {
    console.log("Deleting all tasks");
    tasks.splice(0, tasks.length);
    res.status(204).send();
});


module.exports = router;
