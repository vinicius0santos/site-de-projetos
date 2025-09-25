const express = require('express');
const app = express();
const User = require('./router/User');
const Comment = require('./router/Comment');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/user', User);
app.use('/comment', Comment);

app.get('/', (req, res) => {
    res.header('content-type', 'text/html');
    res.send("<h1>Api do Bundello</h1>");
})

app.listen(3000, () => {
    console.log('Servidor back-end iniciado');
})