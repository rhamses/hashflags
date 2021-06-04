const client = require("../config.js")();

module.exports = async (pagination) => {
  const db = await client;
  return await db.collection('entries').find({}).limit(pagination.items).skip(pagination.skip).sort('starting', -1).toArray().then(response => response).catch(err => console.log("err", err));
}