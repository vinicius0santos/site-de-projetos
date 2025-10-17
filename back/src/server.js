require('dotenv').config({path: './src/.env'});
const express = require('express');
const multer = require('multer');
const upload = multer()
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middleware/auth');

const User = require('./router/User');
const Project = require('./router/Project');
const Comment = require('./router/Comment');
const Section = require('./router/Section');
const List = require('./router/List');

const origin = 'http://localhost:5173';
const corsOption = {
    origin: origin,
    methods: ['GET', 'POST', 'PUT','DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

// Middleware
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
  app.use(cors(corsOption))
  app.use(cookieParser())

// Rotas
  app.get('/', (req, res) => res.send('Api do bundello'));
  app.use('/user', User);
  app.use('/project', authenticateToken, upload.single('file'), Project);
  app.use('/comment', authenticateToken, Comment);
  app.use('/section', authenticateToken, Section);
  app.use('/list', authenticateToken, List);
  app.get('/auth', authenticateToken, (req, res) => {
    res.json({success: true});
  });

// Conexão
  app.listen(3000, () => {
      console.clear()
      console.log('Servidor back-end iniciado');
  })