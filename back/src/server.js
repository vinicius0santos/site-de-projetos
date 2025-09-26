const express = require('express');
const app = express();
const User = require('./router/User');
const Project = require('./router/Project');
const Comment = require('./router/Comment');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const corsOption = {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOption))
app.use('/user', User);
app.use('/projects', Project);
app.use('/comment', Comment);

app.get('/', (req, res) => {
    res.header('content-type', 'text/html');
    res.send("<h1>Api do Bundello</h1>");
})

app.listen(3000, () => {
    console.log('Servidor back-end iniciado');
})