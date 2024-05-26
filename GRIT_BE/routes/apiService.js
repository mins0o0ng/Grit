const express = require('express');
const router = express.Router();
const apiController = require('../functions/apiController');
const { getFirstAndLastDateOfMonth, getFirstAndLastDateOfWeek } = require('../functions/dateFunction');
const path = require('path');

const getMeal = async (req, res, next) => {
    try {
        const day = await parseInt(req.body.value);
        console.log(day.toString());
        const monthDates = getFirstAndLastDateOfMonth(day.toString());
        console.log('dates',monthDates.firstDate, monthDates.lastDate);
        const mealData = await apiController.meal(monthDates.firstDate, monthDates.lastDate);
        res.status(200).json(mealData);
    } catch (err) {
        res.status(404);
        next(err);
    }
};

const getTimetable = async (req, res, next) => {
    try {
        const day = parseInt(req.body.value);
        const weekDates = getFirstAndLastDateOfWeek(day);

        const timetableData = await apiController.timetable(weekDates.mondayDate, weekDates.fridayDate);
        res.status(200).json(timetableData);
    } catch (err) {
        res.status(404);
        next(err);
    }
}


router.get('/meal/:id', getMeal);
router.get('/timetable/:id', getTimetable);

module.exports = router;