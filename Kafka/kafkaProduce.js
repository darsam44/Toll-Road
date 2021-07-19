// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const simu = require('../simu/simulator');
var redis = require('../Redis/RedisSender');

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

// const prefix = "gh1qkygc-";
const topic = `${prefix}dar`; // send to this topic
const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

producer.on("ready", function(arg) {
  console.log(`producer Ariel is ready.`);
  simu.Simulator_cars(publish2);
});
producer.connect();
//publish is a name can be any name...
module.exports.publish= function(msg)
{   
  m=JSON.stringify(msg);
  //redis.ReciveData(m.value.toString());
  producer.produce(topic, -1, genMessage(m), uuid.v4());  //Send to KAFKA
  //producer.disconnect();   
}

function publish2(msg)
{   
  m=JSON.stringify(msg);
  producer.produce(topic, -1, genMessage(m), uuid.v4());  //Send to KAFKA
  //producer.disconnect();   
}