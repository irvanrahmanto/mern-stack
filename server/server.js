const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://cruddb:cruddb@cluster0-g5p4c.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/index'));

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

PORT = process.env.PORT | 8000;

app.listen(PORT, (req, res) => {
    console.log('Server running at port ' + PORT + '!');
});