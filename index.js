require('dotenv').config();
const errorMiddlewares = require('./middlewares/error-middlewares');
const todoLists = require('./todolists/todolists-router');
const tasks = require('./tasks/tasks-router');
const user = require('./users/users-router');
const apiRouter = require('./api/api-router');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/serverfortodo');
const express = require('express');
const app = express();
const port = process.env.PORT || 3010;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/todolists', todoLists);
app.use('/todolist', tasks);
app.use('/users', user);
app.use('/api', apiRouter);
app.use(errorMiddlewares);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
