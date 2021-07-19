const mongos = require('../mongodb/mongo');
let cars;
module.exports.fetchAll = ()=>{
    cars = mongos.ConnectTodb(null ,  2);
        // console.log(cars);
    
}
