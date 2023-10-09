const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysqlQuery = require('./db');

async function findTask(id) {
    const sql = `
    SELECT * from tasks where id = ${id};
`;
    /** @type{{id: number, name: string, done: boolean}[]} */
    const result = await mysqlQuery(sql);
    if (!result.length) {
        return null;
    }

    return result[0];
}

async function findTasks() {
    const sql = `
    SELECT * FROM tasks
`;

    return await mysqlQuery(sql);
}

async function createTask(task) {
    const sql = `
    INSERT INTO tasks (name, done) VALUES ('${task.name}', ${task.done});
    SELECT last_insert_id();
`;
    const result = await mysqlQuery(sql);
    const generatedId = result[1][0]['last_insert_id()'];
    return await findTask(generatedId);
}

async function updateTask(task) {
    const sql = `
    UPDATE tasks SET name = '${task.name}', done = ${task.done} WHERE id = ${task.id}
`;

    return await mysqlQuery(sql);
}

async function deleteTask(id) {
    const sql = `
    DELETE FROM tasks WHERE id = ${id}
`;

    return await mysqlQuery(sql);
}

router.get('/', async function (req, res) {
    /** @type{{id: number, name: string, done: boolean}[]} */
    const result = await findTasks();
    res.send(result);
});

router.put('/:id', async function (req, res) {
    /** @type{{id: number, name: string, done: boolean}} */
    const task = await findTask(req.params.id);
    if (!task) {
        res.status(404).send({ message: "Not found" });
        return;
    }

    const { name, done } = req.body;
    if (!name || !name.trim()) {
        res.status(400).send({ message: "Task must have a name" });
        return;
    }
    if (typeof done !== "boolean") {
        res.status(400).send({ message: "Invalid task data" });
        return;
    }

    task.done = done;
    task.name = name;
    await updateTask(task);
    res.send(task);
});

// Find a task
router.get('/:id', async function (req, res) {
    /** @type{{id: number, name: string, done: boolean}} */
    const task = await findTask(req.params.id);
    if (!task) {
        res.status(404).send({ message: "Not found" });
        return;
    }
    res.send(task);
});

// Create task
router.post('/', async function (req, res) {
    const request = req.body;
    if (!request.name) {
        res.status(400).send({ message: "Task must have a name" });
        return;
    }

    /** @type{{id: number, name: string, done: boolean}} */
    const task = await createTask({
        name: request.name,
        done: false,
    })
    res.status(201).send(task);
});

router.delete('/:id', async function (req, res) {
    /** @type{{id: number, name: string, done: boolean}} */
    const task = await findTask(req.params.id);
    if (!task) {
        res.status(404).send({ message: "Not found" });
        return;
    }

    await deleteTask(task.id);
    res.status(204).send();
});

// Create tasks table if needed
(async function () {
    try {
        const sql = `
    CREATE TABLE IF NOT EXISTS tasks(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        done BOOLEAN
    );
`;
        await mysqlQuery(sql);
    } catch (error) {
        console.log("Database not up")
    }
})();


module.exports = router;
