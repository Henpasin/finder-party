const express = require('express');
const ControllerEvent = require('../controllers/controllerEvent');

const router = express.Router();

router.post('/addEvent', ControllerEvent.addEvents);
router.get('/getAllEvent', ControllerEvent.getEvents);
router.get('/getAllEvent/:id', ControllerEvent.getEventId);

module.exports = router; 