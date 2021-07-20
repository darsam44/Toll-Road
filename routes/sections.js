const path = require('path');
// const RedisR = require('../Redis/RedisReciver');
const express = require('express');
const router = express.Router();

router.get('/section1');
router.get('/section2');
router.get('/section3');
router.get('/section4');
router.get('/section5');


module.exports = router;