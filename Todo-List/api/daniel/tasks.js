// Based one:
// https://expressjs.com/en/guide/routing.html
const express = require('express');
const router = express.Router();

/** @type{{id: number, name: string, done: boolean}[]} */
const tasks = [
    { id: 1, name: "some name1", done: false },
    { id: 2, name: "some name2", done: false },
    { id: 3, name: "some name3", done: false },
    { id: 4, name: "some name4", done: false },
];



// Search
router.get('/', function (req, res) {
    console.log("Handling request to search tasks")
    res.send(tasks);
});


router.get('/:id', function (req, res) {
    console.log("Handling request to find taks")
    const id = parseInt(req.params.id);
    const result = tasks.filter((task) => task.id === id);
    if (result.length === 0) {
        res.status(404).send({ message: "Not found" });
        return;
    }
    // Return all tasks
    res.send(result[0]);
});

module.exports = router;
