const { all } = require("mathjs");

var brands = ['Audi', 'BMW', 'Ford', 'Honda', 'Renault', 'Toyota', 'Lamborghini', 'Maserati']; 
var colors = ['red', 'green', 'blue', 'white', 'black', 'yellow', 'pink'];
var car_types = ['car', 'truck' , 'bus' , 'motorcycle'];

var probabilities = [0.7, 0.1, 0.1, 0.1];
module.exports.simularloop = function(cb){
    setInterval(function(){ Simulator_cars(cb)},1500)
}

// evry vehicle have: brand, color, car_type, in_section, now_section, week_day, special_day, date, hour_in, hour_out,out_section.
function Simulator_cars(cb){
    
        var car_detail = {};
        car_detail.brand = brands[(Math.random() * brands.length) | 0];
        car_detail.color = colors[(Math.random() * colors.length) | 0];
        car_detail.car_type = getRandomType();
        car_detail.in_section = Math.floor(Math.random() * 5) + 1;
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
        do{
            car_detail.out_section = Math.floor(Math.random() * 5) + 1;
        }while (car_detail.out_section == car_detail.in_section)

        //car type
        switch(car_detail.car_type){
            case 'car':
                if (car_detail.color === 'red'){
                    car_detail.out_section = 2;
                }
                if (car_detail.color === 'green'){
                    car_detail.out_section = 1;
                }
                if (car_detail.color === 'blue'){
                    car_detail.out_section = 3;
                }
                if (car_detail.color === 'white'){
                    car_detail.out_section = 2;
                }
                if (car_detail.color === 'black'){
                    car_detail.out_section = 3;
                }
                if (car_detail.color === 'yellow'){
                    car_detail.out_section = 4;
                }
                if (car_detail.color === 'pink'){
                    car_detail.out_section = 5;
                }
            
                break;
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
                case 'motrocycle':
                car_detail.out_section = 3
                break;
            default:   
        }
        cb(car_detail);
}
function getRandomType () {
    var num = Math.random(),
        s = 0,
        lastIndex = probabilities.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += probabilities[i];
        if (num < s) {
            return car_types[i];
        }
    }

    return car_types[lastIndex];
};