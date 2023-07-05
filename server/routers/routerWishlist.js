const express = require('express');
const ControllerWishlist = require('../controllers/contollerWishlist');

const router = express.Router();

router.post('/addWishlist/:id', ControllerWishlist.createdWishlist);
router.get('/getWishlist', ControllerWishlist.getWishlist);
router.delete('/deleteWishlist/:id', ControllerWishlist.deleteWishlist);

module.exports = router; 