const path = require('path');
const RedisR = require('../Redis/RedisReciver');
const express = require('express');
const router = express.Router();

router.get('/dashboard', RedisR.getcars);


module.exports = router;