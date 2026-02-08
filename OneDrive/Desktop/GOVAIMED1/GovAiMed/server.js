const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./Routes/routes');

dotenv.config();
require('./config/db');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});


//routes
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






