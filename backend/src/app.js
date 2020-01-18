const express = require('express');
const app = express();

const authRouter = require('./auth/auth-router');
const eventsRouter = require('./events/events-router');

const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);

module.exports = app;