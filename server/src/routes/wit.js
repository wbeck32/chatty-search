require('dotenv');
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const { asyncIt } = require('./middleware');
const superagent = require('superagent');
const jsonp = require('superagent-jsonp');
const { URL } = require('url');

router.get(
  '/message',
  asyncIt(async (req, res, next) => {
    const { value, context, v, verbose } = req.query;
    const token = 'Bearer ' + process.env.REACT_APP_WIT_TOKEN;
    const message = querystring.stringify({
      q: value,
      verbose: verbose,
      v: v,
      context: context
    });
    console.log(444, token)
    const messageResults = await superagent
      .get('https://api.wit.ai/message')
      .set('Authorization', token)
      .query(message)
      .use(jsonp)
    console.log(messageResults.body);
    return messageResults.body;
  })
);

module.exports = router;
