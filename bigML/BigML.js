var bigml = require('bigml');

var connection = new bigml.BigML('AvitalPikovsky',
                             '0c5180dea701be4fe83145c6ca41dd536bf90f23')

var source = new bigml.Source(connection);

source.create('./cars.csv', function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset(connection);
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model(connection);
        model.get('model/60f409c95e269e0554013c3d', function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.BatchPrediction(connection);
            prediction.create(modelInfo, datasetInfo, 0, 0, async function(error, predictionS){
                if(error) throw error;
                var done = false;
                while(!done) {
                    prediction.get(predictionS.modelInfo, function (error, pred){
                        if(error) throw error;
                        if(pred.object.status.code == 5)
                        done = true;
                    });
                }
            });
          }
        });
      }
    });
  }
});