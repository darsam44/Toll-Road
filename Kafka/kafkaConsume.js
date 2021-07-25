// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
// const mongodb = require('mongodb');
const mongos = require('../mongodb/mongo');
const bigmlm = require('../bigML/BigML');
var redis = require('../Redis/RedisSender');

//road6

// const kafkaConf = {
//   "group.id": "cloudkarafka-example",
//   "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
//   "socket.keepalive.enable": true,
//   "security.protocol": "SASL_SSL",
//   "sasl.mechanisms": "SCRAM-SHA-256",
//   "sasl.username": "gh1qkygc",
//   "sasl.password": "Sc6xr4WIjpqNjxv8SvHZqwrtUiQ0cfOy",
//   "debug": "generic,broker,security"
// };
// const prefix = "gh1qkygc-";

//car6
// const kafkaConf = {
//   "group.id": "cloudkarafka-example",
//   "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
//   "socket.keepalive.enable": true,
//   "security.protocol": "SASL_SSL",
//   "sasl.mechanisms": "SCRAM-SHA-256",
//   "sasl.username": "js9ty9ln",
//   "sasl.password": "n3jmymvhIGE-uDgJRGei0rMEUz5yk9x6",
//   "debug": "generic,broker,security"
// };

// const prefix = "js9ty9ln-";

//ROAD6
const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-01.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "6k4q1urw",
  "sasl.password": "tZPUr00GrIrA3mzh9M9TWX9m_VjJ-Png",
  "debug": "generic,broker,security"
};

const prefix = "6k4q1urw-";


const topic = `${prefix}new`; // send to this topic
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
  // console.log(m.value.toString());
  console.log("i am here");
  bigmlm.bigmlprediction(m.value.toString());
  mongos.ConnectTodb(m.value.toString() , 1);
  redis.ReciveData(m.value.toString());
});

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