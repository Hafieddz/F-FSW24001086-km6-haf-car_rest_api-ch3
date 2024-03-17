const express = require('express');
const morgan = require('morgan');

const port = 8000;

const app = express();

app.get('/', (req,res) => {
    res.send('Hallo Server');
})

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
})