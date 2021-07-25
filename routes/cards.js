const path = require('path');
const express = require('express');
const router = express.Router();
const RedisR = require('../Redis/RedisReciver');
const bigmlm = require('../bigML/BigML');
const mongofetch = require('../mongodb/mongofetch');

router.get('/', RedisR.getcars);

router.get('/bigml', bigmlm.showMatrix );

router.get('/fetch', mongofetch.fetchAll);

module.exports = router;