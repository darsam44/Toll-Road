const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Road6:daravital12345@cluster0.slp0a.mongodb.net/Road6?retryWrites=true&w=majority";
var fs = require('fs'); 
var parse = require('csv-parse');

let _dbo;

// this function connect to the data base and upload(1) or fetch(2) the data
 module.exports.ConnectTodb =  function(data , n){
    const car = JSON.parse(data);
    MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true } ,function(err, db) {
        if (err) throw err;
        _dbo = db.db("Road6");
        if (n == 1)
        _dbo.collection("cars").insertOne(car, function(err, res) {
          if (err) throw err;
          db.close();
        });
        else{
          _dbo.collection("cars")
          .find()
          .toArray()
          .then(products => {
            convertJSONtocsv(products); 
             console.log("checnge csv");
            return products;
          })
          .catch(err => {
            console.log(err);
          });
        }
      });
}

function convertJSONtocsv(data) {
  csv = data.map(row => Object.values(row));
  csv.unshift(Object.keys(data[0]));
  fs.writeFileSync('./bigML/cars.csv', csv.join('\n'), 'utf8')
}


