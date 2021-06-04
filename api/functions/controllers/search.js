const client = require("../config.js")();

module.exports = async (search) => {
  console.log("search", search);
  const db = await client;
  return await db.collection('entries').aggregate([
    {
      '$search': {
        'compound': {
          'should': [
            {
              'autocomplete': {
                'query': search, 
                'path': 'campaignName', 
                'fuzzy': {
                  'maxEdits': 1, 
                  'prefixLength': 1, 
                  'maxExpansions': 256
                }, 
                'score': {
                  'boost': {
                    'value': 3
                  }
                }
              }
            }, {
              'text': {
                'query': search, 
                'path': 'hashtag', 
                'fuzzy': {
                  'maxEdits': 1, 
                  'prefixLength': 3, 
                  'maxExpansions': 256
                }, 
                'score': {
                  'boost': {
                    'value': 3
                  }
                }
              }
            }
          ]
        }
      }
    }, 
    {
      '$sort': {
        'score': -1, 
        'ending': -1
      }
    }, 
    {
      '$project': {
        'campaignName': 1, 
        'score': {
          '$meta': 'searchScore'
        }, 
        'hashtag': 1, 
        'starting': 1, 
        'ending': 1, 
        'assetUrl': 1
      }
    }
  ]).toArray();
}