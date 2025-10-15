const express = require('express');
const multer = require('multer');
const upload = multer()
const app = express();
const User = require('./router/User');
const Project = require('./router/Project');
const Comment = require('./router/Comment');
const Section = require('./router/Section');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticateToken = require('./middleware/auth');
const origin = '*';
require('dotenv').config();

const corsOption = {
    origin: origin,
    methods: ['GET', 'POST', 'PUT','DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors(corsOption))
app.use('/user', User);
app.use('/project', upload.single('file'), Project);
app.use('/comment', Comment);
app.use('/section', Section);
app.get('/auth', authenticateToken, (req, res) => {
    res.json({success: true});
});

app.get('/', (req, res) => {
    res.header('content-type', 'text/html');
    res.send("<h1>Api do Bundello</h1>");
})

app.listen(3000, () => {
    console.clear()
    console.log('Servidor back-end iniciado');
})