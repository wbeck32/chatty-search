require('dotenv')
const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const querystring = require('querystring');
const { asyncIt } = require('./middleware');

router.get(
  '/refineKeywords',
  asyncIt(async (req, res, next) => {
    console.log(22, req.query);
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
      // console.log(98, JSON.parse(refinedKeywords.text))
      const keywordToReturn = JSON.parse(refinedKeywords.text);
      // console.log(44,keywordToReturn.getSearchKeywordsRecommendationResponse[0].keywords)
    return keywordToReturn.getSearchKeywordsRecommendationResponse[0].keywords;
  })
),
  router.get(
    '/findItem',
    asyncIt(async (req, res, next) => {
      const {keywords} = req.query;
      console.log(7878, keywords)
      const findItems = querystring.stringify({
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.0.0',
        'RESPONSE-DATA-FORMAT': 'JSON',
        'keywords': keywords,
        'SECURITY-APPNAME': process.env.REACT_APP_SECURITY_APPNAME,
        'GLOBAL-ID': 'EBAY-US'
      });
      const searchResults = await superagent
        .get('https://svcs.ebay.com/services/search/FindingService/v1')
        .query(findItems);
        const results = JSON.parse(searchResults.text)
        console.log(99, results)
      return results.findItemsByKeywordsResponse[0].searchResult;
    })
  );

module.exports = router;