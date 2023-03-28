const db = require('./config/mongoose');

const express = require('express');
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error while connecting to the server: ${err}`);
        return;
    }
    console.log(`Server running on port: ${port}`);
});