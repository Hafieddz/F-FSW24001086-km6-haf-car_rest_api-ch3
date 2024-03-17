const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const port = 8000;
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

const app = express();

app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('message : ping successfully')
})

app.get('/cars', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            cars
        }
    })
})

app.get('/cars/:id', (req, res) => {
    const id = req.params.id

    const car = cars.find(car => car.id === id)

    if (car) {
        res.status(200).json({
            status: 'success',
            data: {
                car
            }
        })
    } else {
        res.status(404).json({
            status: 'error',
            message: 'data not found'
        })
    }
})

app.patch('/cars/:id', (req, res) => {
    const id = req.params.id
    const carIndex = cars.findIndex(car => car.id === id)

    cars[carIndex] = { ...cars[carIndex], ...req.body }

    if (carIndex) {
        fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
            if (err) {
                res.status(405).json({
                    status: 'error',
                    message: 'failed to update car data!'
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    data: {
                        car: cars[carIndex]
                    }
                })
            }
        })
    } else {
        res.status(404).json({
            status: 'error',
            message: 'data not found'
        })
    }
})

app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;

    const carIndex = cars.findIndex(car => car.id === id)

    cars.splice(carIndex, 1);

    if (carIndex) {
        fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
            if (err) {
                res.status(405).json({
                    status: 'error',
                    message: 'failed to delete car data!'
                })
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'data deleted successfully'
                })
            }
        })
    } else {
        res.status(404).json({
            status: 'error',
            message: 'data not found'
        })
    }
})

app.post('/cars', (req, res) => {
    const newCar = req.body;

    cars.push(newCar);
    fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: 'cannot created data!'
            })
        } else {
            res.status(201).json({
                status: 'success',
                data: {
                    car: newCar
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
})