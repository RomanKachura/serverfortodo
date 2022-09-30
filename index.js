const todoLists = require('./todolists-router');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/serverfortodo');
const express = require('express');
const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/todolists', todoLists);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});