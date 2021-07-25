const mongos = require('../mongodb/mongo');
let cars;
// connect to mongodb and wend him numer 2 that he will know to fetch all the data from mongodb and Exports the data to csv
module.exports.fetchAll = ()=>{
    cars = mongos.ConnectTodb(null ,  2);
}
