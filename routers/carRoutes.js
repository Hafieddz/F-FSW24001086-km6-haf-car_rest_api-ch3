const express = require('express');
const carContoller = require('../controllers/carContoller')

const router = express.Router();

router.route('/')
    .get(carContoller.getCars)
    .post(carContoller.createCar)

router.route('/:id')
    .get(carContoller.getCarById)
    .patch(carContoller.updateCar)
    .delete(carContoller.deleteCar)

module.exports = router;