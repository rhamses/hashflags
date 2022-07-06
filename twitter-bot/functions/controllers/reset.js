const functions = require("firebase-functions");
const fs = require("fs");
const os = require("os");
const lastRunFile = os.tmpdir() + "/lastrun.txt";

module.exports = functions
    .https.onRequest(async (request, response) => {
      fs.writeFileSync(lastRunFile, "");
      response.send("resetado");
    });
