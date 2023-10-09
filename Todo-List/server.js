const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Register tasks router
const brunaDumerTasksRouter = require('./api/bruna_dumer/tasks');
app.use('/api/bruna_dumer/tasks', brunaDumerTasksRouter);

const danbsTasksRouter = require('./api/danbs/tasks');
app.use('/api/danbs/tasks', danbsTasksRouter);

const danielCamargoTasksRouter = require('./api/danielcamargo/tasks');
app.use('/api/danielcamargo/tasks', danielCamargoTasksRouter);

const moroniTasksRouter = require('./api/moroniIbarra/tasks');
app.use('/api/moroniIbarra/tasks', moroniTasksRouter);

const jacobTasksRouter = require('./api/jacob_castaneda/tasks');
app.use('/api/jacob_castaneda/tasks', jacobTasksRouter);

const andreTasksRouter = require('./api/andre/tasks');
app.use('/api/andre/tasks', andreTasksRouter);

const roseTasksRouter = require('./api/Rose/tasks');
app.use('/api/rose/tasks', roseTasksRouter);

const stefanyTasksRouter = require('./api/stefany_peixoto/tasks');
app.use('/api/stefany_peixoto/tasks', stefanyTasksRouter);

const fernandoTasksRouter = require('./api/fernandomesser/tasks');
app.use('/api/fernandomesser/tasks', fernandoTasksRouter);

const danielTasksRouter = require('./api/daniel/tasks');
app.use('/api/daniel/tasks', danielTasksRouter);

const pedroTasksRouter = require('./api/pedroPerillo/tasks');
app.use('/api/pedroPerillo/tasks', pedroTasksRouter);

const doyoungTasksRouter = require('./api/doyoung/tasks');
app.use('/api/doyoung/tasks', doyoungTasksRouter);

const pieroTasksRouter = require('./api/piero/tasks');
app.use('/api/piero/tasks', pieroTasksRouter);

const thiagoTasksRouter = require('./api/thiago/tasks');
app.use('/api/thiago/tasks', thiagoTasksRouter);

const yagoTasksRouter = require('./api/yago/tasks');
app.use('/api/yago/tasks', yagoTasksRouter);

const vegaTasksRouter = require('./api/vega/tasks');
app.use('/api/vega/tasks', vegaTasksRouter);


// Start server
app.listen(3000, () => {
    console.log('Server Started');
});
