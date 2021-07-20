var bigml = require('bigml');

var connection = new bigml.BigML('AvitalPikovsky',
                             '0c5180dea701be4fe83145c6ca41dd536bf90f23')

var source = new bigml.Source(connection);

// source.create('./bigML/cars.csv', function(error, sourceInfo) {
//     if (!error && sourceInfo) {
//       var dataset = new bigml.Dataset(connection);
//       dataset.create(sourceInfo, function(error, datasetInfo) {
//         if (!error && datasetInfo) {
//           var model = new bigml.Model(connection);
//           model.create(datasetInfo, function (error, modelInfo) {
//             if (!error && modelInfo) {
//               var prediction = new bigml.Prediction(connection);
//               prediction.create(modelInfo,{"in_section":1})
        
//               const localmodel = new bigml.LocalModel(prediction.resource, connection );
//               localmodel.predict({"car_type":"truck"}, function(error,prediction){
//                   console.log(prediction.prediction)
//               })
//             }
//           });
//         }
//       });
//     }
//   });
  const localModel = new bigml.LocalModel('model/60f6edb2c1c0000b900d5a99', connection);
                        localModel.predict({"car_type":"car", "color":"pink"},
                            function(error, prediction) {
                                // let pred = JSON.parse(prediction);
                                // console.log("here: "+ pred)
                                console.log("the prediction is: " + prediction.prediction)
                            });