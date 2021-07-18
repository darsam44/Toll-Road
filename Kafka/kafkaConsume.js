// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
// const mongodb = require('mongodb');
const mongos = require('../mongodb/mongo');
// const mongoC = require('../mongodb/mongo').ConnectTodb;
// const SendToDb = require('../mongodb/mongo').SendToDb;
// const getDb = require('../mongodb/mongo').getDb;

// var redis = require('../Redis/RedisSender');

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "gh1qkygc",
  "sasl.password": "Sc6xr4WIjpqNjxv8SvHZqwrtUiQ0cfOy",
  "debug": "generic,broker,security"
};

const prefix = "gh1qkygc-";
const topic = `${prefix}test`; // send to this topic
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);
//const prefix = process.env.CLOUDKARAFKA_USERNAME;

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
  console.log(m.value.toString());
  mongos.ConnectTodb(m.value.toString() , 1);
  // redis.ReciveData(m.value.toString());
  
});

// function save (data){
//   const db = getDb();
//   const car = JSON.parse(data);
//   return db
//     .collection('products')
//     .insertOne(car)
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
  // console.log(log);
});
consumer.connect();