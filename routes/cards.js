const path = require('path');
const express = require('express');
const router = express.Router();
const RedisR = require('../Redis/RedisReciver');
const bigmlm = require('../bigML/BigML');

router.get('/', RedisR.getcars);
router.get('/bigml', bigmlm.showMatrix );



module.exports = router;