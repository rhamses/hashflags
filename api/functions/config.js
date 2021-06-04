const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb+srv://ambiente1:HzRYel5sSP1av7SC@cluster0-tkwp3.mongodb.net/test?retryWrites=true&w=majority';
// const MONGODB_URI = process.env.MONGODB_URI;
let cacheDb = null;

module.exports = function connectoToDatabase() {
  if (cacheDb) {
    return Promise.resolve(cacheDb);
  }
  return MongoClient.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      const db = client.db('hashflags');
      cacheDb = db;
      return cacheDb
    });
}