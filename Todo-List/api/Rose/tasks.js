
// Based one:
// https://expressjs.com/en/guide/routing.html
const express = require('express');
const router = express.Router();

/** @type{{id: number, name: string, done: boolean}[]} */
const tasks = [
    { id: 1, name: "Rose Wang", done: true },
    { id: 2, name: "Samel Hung", done: true },
    { id: 3, name: "Daniel Chen", done: false },
    { id: 4, name: "South Zhun", done: false },
];

// Search
router.get('/', function (req, res) {
    console.log("Handling request to search tasks");
    // Return all tasks
    res.send(tasks);
});

// GET /tasks/:id
router.get('/:id', function (req, res) {
    console.log("Handling request to search tasks");
    const id = parseInt(req.params.id);
    const targetTask = tasks.find((tasks) => tasks.id === id);
    if (!targetTask) {
        res.status(404).send({ message: "Task not found" });
        return;
    }
    // Return the task
    res.send(targetTask);
});


router.delete('/:id', function (req, res) {
    console.log("delete task by ID", req.params.id);
    const result = tasks.findIndex(function (task) {
        return task.id == req.params.id;
    })
    if (result === -1) {
        res.status(404).send({ message: "Not found" });
        return;
    }
    // remove the tasks
    tasks.splice(result, 1);
    res.status(204).send();
});

router.post('/', function (req, res) {
    const { name, done } = req.body;

    if (!name) {
        res.status(400).send({ message: 'Task name is required.' });
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        name: name,
        done: done || false
    };

    tasks.push(newTask);

    res.status(201).send(newTask);
});

// PUT /tasks/:id
router.put('/:id', function (req, res) {
    console.log("Updating task");
    const id = parseInt(req.params.id);
    const task = req.body;
    if (!task.name) {
        res.status(400).send({ message: "Task must have a name" });
        return;
    }
    const targetIndex = tasks.findIndex((tasks) => tasks.id === id);
    if (targetIndex === -1) { // -1 means not found
        res.status(404).send({ message: "Task not found" });
        return;
    }
    // Update the task
    tasks[targetIndex] = task;
    res.status(200).send(task);
});



module.exports = router;
