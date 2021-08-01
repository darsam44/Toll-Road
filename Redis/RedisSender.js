var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient();

module.exports.ReciveData = function(data){
    const cars = JSON.parse(data);

    // redisClient.sadd('Cars', cars ,function (err, object){
    // });

    redisClient.publish("message", JSON.stringify(cars), function () {
        console.log('published');
    });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(6062, function () {
    console.log('Sender is running on port 6062');
});