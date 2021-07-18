const mongos = require('../mongodb/mongo');

module.exports.fetchAll = ()=>{
    mongos.ConnectTodb(null ,  2);
}
