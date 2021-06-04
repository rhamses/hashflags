const client = require("../config.js")();

module.exports = async (campaignName) => {
  const db = await client;
  return await await db.collection('entries').find({campaignName: campaignName}).toArray().then(response => response).catch(err => console.log("err", err));
}