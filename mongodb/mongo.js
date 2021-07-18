const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Road6:daravital12345@cluster0.slp0a.mongodb.net/Road6?retryWrites=true&w=majority";

let _dbo;


 module.exports.ConnectTodb =  function(data , n){
    const car = JSON.parse(data);
    MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true } ,function(err, db) {
        if (err) throw err;
        _dbo = db.db("Road6");
        if (n == 1)
        _dbo.collection("cars").insertOne(car, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
        else{
          _dbo.collection("cars")
          .find()
          .toArray()
          .then(products => {
            console.log("fetch all mongo");
            console.log(products);
            return products;
          })
          .catch(err => {
            console.log(err);
          });
        }
      });
}




