var bigml = require('bigml');
const { render } = require('ejs');
var mat_bigMl =[[0,1,2,3,4,5],[1,0,0,0,0,0],[2,0,0,0,0,0],[3,0,0,0,0,0],[4,0,0,0,0,0],[5,0,0,0,0,0]];
var counter = 0 , denominator=0;

var connection = new bigml.BigML('AvitalPikovsky',
                             '0c5180dea701be4fe83145c6ca41dd536bf90f23')

var source = new bigml.Source(connection);
var flag = false;
var queue  =[];

// create new model from csv

// source.create('./bigML/cars.csv', function(error, sourceInfo) {
//     if (!error && sourceInfo) {
//       var dataset = new bigml.Dataset(connection);
//       dataset.create(sourceInfo, function(error, datasetInfo) {
//         if (!error && datasetInfo) {
//           var model = new bigml.Model(connection);
//           model.create(datasetInfo, function (error, modelInfo) {
//             if (!error && modelInfo) {
//               var prediction = new bigml.Prediction(connection);
//               prediction.create(modelInfo,{"":""})
//               const localmodel = new bigml.LocalModel(prediction.resource, connection );
              // localmodel.predict({"car_type":"bus" , "color":"black"}, function(error,prediction){
              //     console.log(prediction.prediction);
              // })
//             }
//           });
//         }
//       });
//     }
//   });

// get car data and insert into queue
module.exports.bigmlprediction = (data)=>{
    
    let car = JSON.parse(data);
    queue.push(car);
    if (flag  === false){ //check if the function finish to predict and then get in to check onther car
        flag = true;
        predictonecar(queue.shift());
    }  
}
  //make prediction on one car.
function predictonecar(car){
    var j = car.out_section;
    const localModel = new bigml.LocalModel('model/60fd4bef47d77512a70c996f', connection);
    localModel.predict(
    {"brand":car.brand,
    "color":car.color,
    "car_type":car.car_type,
    "in_section":car.in_section,
    "week_day":car.week_day,
    "special_day":car.special_day},
        function(error, prediction) {
            var i = Math.round(prediction.prediction)
            if (i < 6){
                denominator++;
                mat_bigMl[i][j]++;
                if (i == j){
                  counter++;
                }
            }
        });
        flag = false;
}

// send the matrix to bigml page
exports.showMatrix = (req ,res ,error ) => {
 var accurency = (counter/denominator);

  res.render('./pages/BigML', {mat: {mat_bigMl , accurency}});
}