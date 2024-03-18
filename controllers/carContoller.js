const fs = require('fs')

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`, 'utf-8'))

const getCars = (req, res) => {
    res.status(200).json({
        status: 'success',
        totalData : cars.length,
        data: {
            cars
        }
    })
}

const getCarById = (req, res) => {
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
}

const updateCar = (req, res) => {
    const id = req.params.id
    const carIndex = cars.findIndex(car => car.id === id)

    cars[carIndex] = { ...cars[carIndex], ...req.body }

    if (carIndex) {
        fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), (err) => {
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
}

const deleteCar = (req, res) => {
    const id = req.params.id;

    const carIndex = cars.findIndex(car => car.id === id)

    cars.splice(carIndex, 1);

    if (carIndex) {
        fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), (err) => {
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
}

const createCar = (req, res) => {
    const id = Date.now().toString();
    const newCar = { id, ...req.body };

    cars.push(newCar);
    fs.writeFile(`${__dirname}/../data/cars.json`, JSON.stringify(cars), (err) => {
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
}

module.exports = { getCars, getCarById, updateCar, deleteCar, createCar }