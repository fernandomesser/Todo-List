// https://expressjs.com/en/guide/routing.html
const express = require('express');
const router = express.Router();

/** @type{{id: number, name: string, done: boolean}[]} */
const tasks = [
    { id: 1, name: "Week 1", done: true },
    { id: 2, name: "Week 2", done: false },
    { id: 3, name: "Week 3", done: false },
    { id: 4, name: "Week 4", done: false },
    { id: 5, name: "Week 5", done: false },
];

// GET /api/thiago/tasks/
router.get('/', function (req, res) {
    console.log("Handling request to search tasks");
    // Return all tasks
    res.send(tasks);
});

// GET /api/thiago/tasks/id={id}
router.get('/:id', function (req, res) {
    console.log("Handling request to find a task by id: ", req.params.id);
    const id = parseInt(req.params.id);
    const filteredTasks = tasks.filter((task) => task.id === id);
    if (filteredTasks.length === 0) {
        res.status(404).send({ message: "Not found" });
        return;
    }

    // Return task
    res.send(filteredTasks[0]);
});

// DELETE /api/thiago/tasks/id={id}
router.delete('/:id', function (req, res) {
    console.log("Handling request to delete a task by id: ", req.params.id);
    const id = parseInt(req.params.id);
    const filteredTasksIndex = tasks.findIndex((task) => task.id === id);
    if (filteredTasksIndex === -1) {
        res.status(404).send({ message: "Task not found" });
        return;
    }

    // Remove the task
    tasks.splice(filteredTasksIndex, 1);

    // Return task
    res.status(204).send();
});

// POST /api/thiago/tasks/
router.post('/', function (req, res) {
    console.log("Handling request to create a task");

    const { name, done } = req.body;

    // Input validation
    if (!name || typeof done !== "boolean") {
        res.status(400).send({ message: "Invalid task data" });
        return;
    }

    // Create a new task object
    const newTask = {
        id: tasks.length + 1, // Generate a unique ID based on the length of the tasks array
        name: name,
        done: done
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    res.status(201).send(newTask);
});

// PUT /api/thiago/tasks/id={id}
router.put('/:id', function (req, res) {
    console.log("Handling request to update a task");

    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    const { done } = req.body;

    // Input validation
    if (index === -1) {
        res.status(404).send({ message: "Not found" });
        return;
    }

    // Input validation
    if (typeof done !== "boolean") {
        res.status(400).send({ message: "Invalid task data" });
        return;
    }

    // Updating the task to the tasks array
    tasks[index].done = done;

    res.send(tasks[index]);
});

module.exports = router;
