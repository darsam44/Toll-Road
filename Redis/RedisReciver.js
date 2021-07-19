var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
var redisClient = redis.createClient();
var sub = redis.createClient();
let num_cars;
let ima_shelo;
var allMap  = new Map();
var car_number =0;
var section1=0 , section2=0, section3=0, section4=0, section5=0; 

redisClient.subscribe('message'); 

app.get('/', (req, res) => res.send('Hello World!'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


redisClient.on("message", function (channel, data) {
    var values = new Map();

   
    let jsonObject = JSON.parse(data);
    // var values = [];
    values.set("brand", jsonObject.brand);
    values.set("color", jsonObject.color);
    values.set("car_type", jsonObject.car_type);
    values.set("in_section", jsonObject.in_section);
    values.set("out_section", jsonObject.out_section);
    values.set("now_section", jsonObject.now_section);
    values.set("week_day", jsonObject.week_day);
    values.set("special_day", jsonObject.special_day);
    values.set("date", jsonObject.date);
    values.set("hour_in", jsonObject.hour_in);
    values.set("hour_out", jsonObject.hour_out);

    allMap.set(car_number, values);
    car_number++;
    
    // console.log(allMap.get(1).get("brand"));
    
});

exports.getcars = (req, res, next) => {
    
    moveCars();
    
    allMap.forEach(car => {
        var now_sec = car.get("now_section");
        var out_sec = car.get("out_section");
        console.log(("car start:"));
        console.log(car.get("now_section"));
        if (now_sec < out_sec){
           var now = car.get("now_section");
           now++;
           car.set("now_section" , now);
        }
        else if(now_sec > out_sec){
           var now = car.get("now_section");
           now--;
           car.set("now_section" , now);
        }
        else {
            allMap.delete(car);
        }
        console.log(("car end:"));
        console.log(car.get("now_section"));
    });
    
    var Allsections = section1+ section2+ section3+section4+section5;
    var cards=[
        {section: "section 1", Number_of_cars: section1 , Precent_of_cars: (section1/Allsections)*100 },
        {section: "section 2", Number_of_cars: section2 , Precent_of_cars: (section2/Allsections)*100 },
        {section: "section 3", Number_of_cars: section3 , Precent_of_cars: (section3/Allsections)*100 },
        {section: "section 4", Number_of_cars: section4 , Precent_of_cars: (section4/Allsections)*100 },
        {section: "section 5", Number_of_cars: section5 , Precent_of_cars: (section5/Allsections)*100 }];
    res.render('./pages/index', {cards:cards});
};

function moveCars (){
    allMap.forEach(car => {
        var sec = car.get("now_section");
        
        //console.log(car.get("now_section"));
        if (sec == 1) section1++;
        else if(sec == 2)section2++;
        else if(sec == 3)section3++;
        else if(sec == 4)section4++;
        else section5++;
        
    });
}


redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

