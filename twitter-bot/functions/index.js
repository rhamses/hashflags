const loadFile = require("./controllers/loadFile");
const tweet = require("./controllers/tweet");
const image = require("./controllers/genImageRoute");
const reset = require("./controllers/reset");
exports.loadFile = loadFile;
exports.tweet = tweet;
exports.image = image;
exports.reset = reset;
