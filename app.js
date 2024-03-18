const express = require('express');
const morgan = require('morgan');
const router = require('./routers/carRoutes');

const app = express();

app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send({
        message: 'ping successfully'
    })
})

app.use('/cars', router);

module.exports = app;