const express = require('express');
const ControllerUser = require('../controllers/controllerUser');

const router = express.Router();

router.post('/register', ControllerUser.userRegister);
router.post('/login', ControllerUser.userLogin);

module.exports = router; 