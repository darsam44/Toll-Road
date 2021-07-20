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
var Audi=0,BMW=0,Ford=0,Honda=0,Reno=0,Toyota=0,Lamborghini=0,Maserati=0;

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
    
    countSections();
    sumBrand();
    changenow();
     
    var Allsections = section1+ section2+ section3+section4+section5;
    var AllBrands = Audi+ BMW+Ford+Honda+Reno+Toyota+Lamborghini+Maserati;
    
    var brands=[
        {brand_name: 'Audi', Number_of_cars: Audi , Precent_of_cars: (Audi/AllBrands)*100 },
        {brand_name: 'BMW', Number_of_cars: BMW , Precent_of_cars: (BMW/AllBrands)*100 },
        {brand_name: 'Ford', Number_of_cars: Ford , Precent_of_cars: (Ford/AllBrands)*100 },
        {brand_name: 'Honda', Number_of_cars: Honda , Precent_of_cars: (Honda/AllBrands)*100 },
        {brand_name: 'Reno', Number_of_cars: Reno , Precent_of_cars: (Reno/AllBrands)*100 },
        {brand_name: 'Toyota', Number_of_cars: Toyota , Precent_of_cars: (Toyota/AllBrands)*100 },
        {brand_name: 'Lamborghini', Number_of_cars: Lamborghini , Precent_of_cars: (Lamborghini/AllBrands)*100 },
        {brand_name: 'Maserati', Number_of_cars: Maserati , Precent_of_cars: (Maserati/AllBrands)*100 }];
    var cards=[
        {section: "section 1", Number_of_cars: section1 , Precent_of_cars: (section1/Allsections)*100 },
        {section: "section 2", Number_of_cars: section2 , Precent_of_cars: (section2/Allsections)*100 },
        {section: "section 3", Number_of_cars: section3 , Precent_of_cars: (section3/Allsections)*100 },
        {section: "section 4", Number_of_cars: section4 , Precent_of_cars: (section4/Allsections)*100 },
        {section: "section 5", Number_of_cars: section5 , Precent_of_cars: (section5/Allsections)*100 }];
        let all = {cards , brands};
        res.render('./pages/index',{all: all} );
    // ,brands:brands
};

function changenow(){
    allMap.forEach(car => {
        var now_sec = car.get("now_section");
        var out_sec = car.get("out_section");
        if (now_sec < out_sec){
            now_sec++;
           car.set("now_section" , now_sec);
        }
        else if(now_sec > out_sec){
           now_sec--;
           car.set("now_section" , now_sec);
        }
        else {
            allMap.delete(car);
        }
    });
}

function countSections (){
    section1=0 , section2=0, section3=0, section4=0, section5=0;
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

function sumBrand(){
    Audi=0,BMW=0,Ford=0,Honda=0,Reno=0,Toyota=0,Lamborghini=0,Maserati=0;
    allMap.forEach(car => {
        var brand_car = car.get("brand");
        if (brand_car === "Audi") Audi++;
        else if(brand_car == "BMW") BMW++;
        else if(brand_car == "Ford") Ford++;
        else if(brand_car == "Honda") Honda++;
        else if(brand_car == "Reno") Reno++;
        else if(brand_car == "Toyota") Toyota++;
        else if(brand_car == "Lamborghini") Lamborghini++;
        else Maserati++; 
    });
}

redisClient.on('connect', function() {
    console.log('Reciver connected to Redis');
});


server.listen(6061, function() {
    console.log('reciver is running on port 6061');
});

