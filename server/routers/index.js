const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');

const user = require('./routerUser');
const event = require('./routerEvent');
const category = require('./routerCategory');
const wislist = require('./routerWishlist');
const ticket = require('./routerTicket');

router.use('/users', user)
router.use('/events', event)
router.use('/categories', category);
router.use(authentication)
router.use('/wislists', wislist);
router.use('/tickets', ticket);

module.exports = router; 