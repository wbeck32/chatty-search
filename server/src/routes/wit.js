require('dotenv');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const { asyncIt } = require('./middleware');
const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

router.get(
  '/message',
  asyncIt(async (req, res, next) => {
    const { q } = req.query;
    const token = 'Bearer ' + process.env.REACT_APP_WIT_TOKEN;
    const message = querystring.stringify({
      q: q,
      verbose: true,
      v: '20170307'
    });
    const messageResults = await superagent
      .get('https://api.wit.ai/message')
      .set('Authorization', token)
      .query(message)
      .use(jsonp);
    const { entities } = messageResults.body;
    return entities;
  })
);

module.exports = router;
