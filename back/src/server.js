const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.header('content-type','text/html')
    res.send("<h1>Api do Bundello</h1>")
    
})

app.listen(3000, () => {
    console.log('Servidor back-end iniciado');
})