
// tasks.js

const express = require('express');
const router = express.Router();
const fs = require('fs');

/** @type{{id: number, name: string, done: boolean}[]} */
let tasks = [];

function saveTasksToFile() {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks));
}

function loadTasksFromFile() {
    if (!fs.existsSync('tasks.json')) {
        return;
    }
    const json = fs.readFileSync('tasks.json');
    tasks = JSON.parse(json);
}

loadTasksFromFile();

// GET /tasks
router.get('/', function (req, res) {
    console.log("Handling request to search tasks");
    res.send(tasks);
});

//Update a task based on its ID
router.put('/:id', function (req, res) {
    console.log("Handling request to update a task");
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((tasks) => tasks.id === id);
    if (index === -1) {
        res.status(404).send({ message: "Not found" });
        return;
    }

    const task = req.body;
    const { name, done } = task;
    console.log('in', task);
    if (!name || !name.trim()) {
        res.status(400).send({ message: "Task must have a name" });
        return;
    }
    if (typeof done !== "boolean") {
        res.status(400).send({ message: "Invalid task data" });
        return;
    }
    tasks[index].done = done;
    console.log('out', tasks[index]);
    saveTasksToFile(tasks);
    res.send(tasks[index]);
});

// GET /tasks/:id
router.get('/:id', function (req, res) {
    console.log("Handling request to search tasks");
    const id = parseInt(req.params.id);
    const result = tasks.find((tasks) => tasks.id === id);
    if (!result) {
        res.status(404).send({ message: "Not found" });
        return;
    }
    res.send(result[0]);
});

//Understand the purpose of this endpoint

// POST /tasks
router.post('/', function (req, res) {
    console.log("Creating task");
    const task = req.body;
    if (!task.name) {
        res.status(400).send({ message: "Task must have a name" });
        return;
    }

    // Add the task
    const newTask = {
        id: new Date().getTime(),
        name: task.name,
        done: false,
    };
    tasks.push(newTask);
    saveTasksToFile(tasks);
    res.status(201).send(newTask);
});

// DELETE /tasks/:id
router.delete('/:id', function (req, res) {
    console.log("Handling request to delete a task");
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((tasks) => tasks.id === id);
    if (index === -1) {
        res.status(404).send({ message: "Task not found" });
        return;
    }
    tasks.splice(index, 1);
    saveTasksToFile(tasks);
    res.status(204).send();
});

module.exports = router;

