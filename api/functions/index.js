const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const List = require('./controllers/list.js');
const Search = require('./controllers/search.js');
const Details = require('./controllers/details.js');
const Timeline = require('./controllers/timeline.js');

exports.list = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      let considerPagination = false;
      const page = (parseInt(req.params[0].match(/\d/gmi))) ? parseInt(req.params[0].match(/\d/gmi)) : 1;
      const items = (req.query.items) ? parseInt(req.query.items) : 10;
      const skip = page * items;
      const pagination = {
        items,
        skip
      }

      const result = await List(pagination);

      res.send(result);

    } catch(e) {
      console.log(e);
      // statements
      res.send(404,'Erro');
    }
  })
});

exports.search = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      if (req.query.q) {
        const result = await Search(req.query.q); 
        res.send(result);
      } else {
        throw('Error')
      }
    } catch(e) {
      console.log(e);
      // statements
      res.send(404,'Erro');
    }
  })
});

exports.details = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const campaign = ( req.params[0].match(/\w/gmi) ) ? req.params[0].match(/\w/gmi).join("") : null;
      if (campaign) {
        const result = await Details(campaign); 
        res.send(result);
      } else {
        throw('Error')
      }
    } catch(e) {
      console.log(e);
      // statements
      res.send(404,'Erro');
    }
  })
});

exports.timeline = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const hashtag = ( req.params[0].match(/\w/gmi) ) ? req.params[0].match(/\w/gmi).join("") : null;
      if (hashtag) {
        const twitterApi = functions.config().hashflags.twitterapi;
        const result = await Timeline(hashtag, twitterApi);
        res.send(result);
      } else {
        throw('Error')
      }
    } catch(e) {
      console.log(e);
      // statements
      res.send(404,'Erro');
    }
  })
});