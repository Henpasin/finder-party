const express = require('express');
const ContollerCategory = require('../controllers/controllerCategory');

const router = express.Router();

router.post('/addCategory', ContollerCategory.addCategory);
router.get('/getCategory', ContollerCategory.getCategory);

router.post('/EventCate')

module.exports = router; 