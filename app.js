const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server)
const port = 3000

//------------ routes ------------
const Routes = require('./routes/cards');

//------------ sumulator ------------
const simu = require('./simu/simulator');

//------------ kafka------------
const KafkaConsumer = require('./Kafka/kafkaConsume');
const kafka = require('./Kafka/kafkaProduce');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(Routes);

//------------------------------------

server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


