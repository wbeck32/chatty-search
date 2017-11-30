require('dotenv');
const superagent = require('superagent');
const querystring = require('querystring');

export const checkKeywords = async message => {
console.log(process.env)
  const refine = querystring.stringify({
    'OPERATION-NAME': 'getSearchKeywordsRecommendation',
    'SERVICE-VERSION': '1.0.0',
    'RESPONSE-DATA-FORMAT': 'JSON',
    keywords: message.value,
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
};

export const callFindingAPI = async keywords => {
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
};
