require('dotenv');
const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const querystring = require('querystring');
const { asyncIt } = require('./middleware');

router.get(
  '/refineKeywords',
  asyncIt(async (req, res, next) => {
    const refine = querystring.stringify({
      'OPERATION-NAME': 'getSearchKeywordsRecommendation',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      keywords: req.query.data,
      'SECURITY-APPNAME': process.env.REACT_APP_SECURITY_APPNAME,
      'GLOBAL-ID': 'EBAY-US'
    });
    const refinedKeywords = await superagent
      .get('https://svcs.ebay.com/services/search/FindingService/v1')
      .query(refine);
    const keywordsToReturn = JSON.parse(refinedKeywords.text);
    const {
      ack,
      keywords
    } = keywordsToReturn.getSearchKeywordsRecommendationResponse[0];
    const refined = { ack: ack[0], keywords: keywords[0] };
    return refined;
  })
),
  router.get(
    '/findItem',
    asyncIt(async (req, res, next) => {
      const { keywords } = req.query;
      const findItems = querystring.stringify({
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.0.0',
        'RESPONSE-DATA-FORMAT': 'JSON',
        keywords: keywords,
        'SECURITY-APPNAME': process.env.REACT_APP_SECURITY_APPNAME,
        'GLOBAL-ID': 'EBAY-US'
      });
      const searchResults = await superagent
        .get('https://svcs.ebay.com/services/search/FindingService/v1')
        .query(findItems);
      const results = JSON.parse(searchResults.text);
      return results.findItemsByKeywordsResponse[0].searchResult;
    })
  );

module.exports = router;
