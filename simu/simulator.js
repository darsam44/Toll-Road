const { all } = require("mathjs");



module.exports.Simulator_cars = function (cb){
    
    let cars_now = [];
    var brands = ['Audi', 'BMW', 'Nissan', 'Ford', 'Honda', 'Reno', 'Toyota', 'Lamborghini', 'Maserati']; 
    var colors = ['red', 'green', 'blue', 'white', 'black', 'yellow', 'pink'];
    var car_types = ['car', 'truck' , 'bus' , 'motorcycle'];
    
    // while ( cars_now.length < 50 ){
    for(var j = 0 ; j < 10 ; j++){
    
        var car_detail = {};
        //brand
        car_detail.brand = brands[(Math.random() * brands.length) | 0];
        //color
        car_detail.color = colors[(Math.random() * colors.length) | 0];
        //car type
        car_detail.car_type = car_types[(Math.random() * car_types.length) | 0];
        car_detail.in_section = Math.floor(Math.random() * 5) + 1;
        do{
            car_detail.out_section = Math.floor(Math.random() * 5) + 1;
        }while (car_detail.out_section == car_detail.in_section)

        car_detail.now_section = car_detail.in_section;

        car_detail.week_day = Math.floor(Math.random() * 7) + 1;

        if( car_detail.car_type == 'truck' || car_detail.car_type == 'bus'){
            car_detail.special_day = false;
        }
        else {
            car_detail.special_day = Math.random() < 0.5;
        }
        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
        var _date = randomDate(new Date(2020, 0, 1), new Date());
        car_detail.date = _date.getDate() + '-' + (_date.getMonth() + 1) + '-' + _date.getFullYear();

        car_detail.hour_in = Math.floor(Math.random() * 24) + 1;
        car_detail.hour_out = Math.floor(Math.random() * 24) + 1;

        //car and colors
        if (car_detail.car_type === 'car'){
            if (car_detail.color === 'red' || car_detail.color === 'green' ){
                if (car_detail.out_section != 4 && car_detail.out_section != 2){
                    var i = Math.random() < 0.5;
                    if (i == 0 && car_detail.in_section != 2 ){
                        car_detail.out_section = 2;
                    }
                    else {
                        car_detail.out_section = 4
                    }
                }
            }
            else if (car_detail.color === 'blue' || car_detail.color === 'yellow'){
                if (car_detail.out_section != 1 && car_detail.out_section != 3){
                    var i = Math.random() < 0.5;
                    if (i == 0 && car_detail.in_section != 1 ){
                        car_detail.out_section = 1;
                    }
                    else {
                        car_detail.out_section = 3;
                    }
                }
            }
            else if(car_detail.color === 'white' || car_detail.color === 'black'){
                if (car_detail.out_section != 1 && car_detail.out_section != 5){
                    var i = Math.random() < 0.5;
                    if (i == 0 && car_detail.in_section != 1){
                        car_detail.out_section = 1;
                    }
                    else {
                        car_detail.out_section = 5;
                    }
                }
            }
            else {
                if (car_detail.out_section != 2 && car_detail.out_section != 3){
                    var i = Math.random() < 0.5;
                    if (i == 0 && car_detail.in_section != 2){
                        car_detail.out_section = 2;
                    }
                    else {
                        car_detail.out_section = 3;
                    }
                }
            }
        }
        
        // motorcycle
        if (car_detail.car_type === 'motorcycle'){ 
            if (car_detail.out_section != 3 && car_detail.out_section != 5){
                var i = Math.random() < 0.5;
                if (i == 0 && car_detail.in_section != 3 ){
                    car_detail.out_section = 3;
                }
                else {
                    car_detail.out_section = 5;
                }
            }
        }
        // truck and bus
        switch(car_detail.car_type){
            case 'truck':
                car_detail.out_section = 4
                while(car_detail.hour_in < 4 && car_detail.hour_out > 20){
                    car_detail.hour_in = Math.floor(Math.random() * 24) + 1;
                    car_detail.hour_out = Math.floor(Math.random() * 24) + 1;
                }
                while(car_detail.week_day == 7){
                    car_detail.week_day = Math.floor(Math.random() * 7) + 1;
                }
                break;
            case 'bus':
                car_detail.out_section = 5

                while(car_detail.week_day == 7){
                    car_detail.week_day = Math.floor(Math.random() * 7) + 1;
                }
                break;
            default:   
        }
        cars_now.push(car_detail);
        cb(car_detail);
        //console.log(car_detail);
        // socket.emit("callDetails", car_detail);


        // }
    }
}