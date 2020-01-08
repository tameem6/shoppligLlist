const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/items');

const app = express();

//Body parser MW
app.use(bodyParser.json());

//DB Connect 
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log(err));

//Routes
app.use('/items', items);

//Serve static assets if in productions
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));