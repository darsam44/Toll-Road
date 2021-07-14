// const kafka = require('../kafkaProduce');

module.exports.Simulator_cars= function (cb){

for(var i = 0 ; i < 10 ; i++){
    var car_detail = {};
    car_detail.car = 5;
    car_detail.in_ = Math.floor(Math.random()*5) +1 ;
    car_detail.day = Math.floor(Math.random()*7) +1;
    //car_detail.date = math.floor(math.random()*7) +1;
    const hour = Math.floor(Math.random()*24) +1;
    do{
        car_detail.out = Math.floor(Math.random()*5) +1;
    }while (car_detail.out == car_detail.in_)
    cb(car_detail);
    console.log(car_detail);
    // socket.emit("callDetails", car_detail);
    }
}