require('dotenv').config({path: '../../../'})
const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const req = require('superagent');
const querystring = require('querystring');
const { asyncIt } = require('./middleware');

router.get(
  '/refineKeywords',
  asyncIt(async (req, res, next) => {
    console.log(22, req, res);
    const refine = querystring.stringify({
      'OPERATION-NAME': 'getSearchKeywordsRecommendation',
      'SERVICE-VERSION': '1.0.0',
      'RESPONSE-DATA-FORMAT': 'JSON',
      keywords: data,
      'SECURITY-APPNAME': process.env.SECURITY_APPNAME,
      'GLOBAL-ID': 'EBAY-US'
    });
    const refinedKeywords = await superagent
      .get('https://svcs.ebay.com/services/search/FindingService/v1')
      .query(refine);
    return refinedKeywords;
  })
),
  router.get(
    '/findItem',
    asyncIt(async (req, res, next) => {
      console.log(23, req, res);
      const findItems = querystring.stringify({
        'OPERATION-NAME': 'findItemsByKeywords',
        'SERVICE-VERSION': '1.0.0',
        'RESPONSE-DATA-FORMAT': 'JSON',
        keywords: 'bicycle',
        'SECURITY-APPNAME': process.env.SECURITY_APPNAME,
        'GLOBAL-ID': 'EBAY-US'
      });
      const searchResults = await superagent
        .get('https://svcs.ebay.com/services/search/FindingService/v1')
        .query(findItems);
      return searchResults;
    })
  );

module.exports = router;