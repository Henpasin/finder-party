const express = require('express');
const ControllerTicket = require('../controllers/controllerTicket');

const router = express.Router();

router.get('/displayTickets/', ControllerTicket.getAllTickets);
router.post('/buyTicket/:id', ControllerTicket.buyTicket);
router.patch('/confirmTicket/:id', ControllerTicket.confirmTicket);
router.post('/generateToken/:id', ControllerTicket.genearate_token_midtrans);

module.exports = router; 