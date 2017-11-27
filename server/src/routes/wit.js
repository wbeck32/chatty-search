require('dotenv')
const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const req = require('superagent');
const querystring = require('querystring');
const { asyncIt } = require('./middleware');
const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

router.get(
  '/message',
  asyncIt(async (req, res, next) => {
    console.log(22, req.query.q);
    const { q } = req.query;
    const token = 'Bearer '+process.env.REACT_APP_WIT_TOKEN

    const message = querystring.stringify({
      q: q,
      verbose: true
    });
    console.log(22.5, message, token)
    const messageResults = await superagent
      .get('https://api.wit.ai/message')
      .set('Authorization', token)
      .query(message)
      .use(jsonp)
    console.log(23, messageResults.body);
    return messageResults.body;
  })
);

module.exports = router;
