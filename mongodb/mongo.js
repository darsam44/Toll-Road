const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Road6:daravital12345@cluster0.slp0a.mongodb.net/Road6?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var myobj = {};
module.exports.sendData = function(data){
    myobj = data;
}

module.exports.SendTomongodb =  function(data){
    //details = data.substring(2, data.length - 1)
    //details = details.split(/[:,"]+/);
    //console,console.log(details);
    // var newOrder =
    //     {
    //         car: data
    //     }
    const car = JSON.parse(data);
    MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true } ,function(err, db) {
        if (err) throw err;
        var dbo = db.db("Road6");
        
        dbo.collection("cars").insertOne(car, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}

