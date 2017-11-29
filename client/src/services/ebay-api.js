require('dotenv')
const superagent = require('superagent');

export const checkKeywords = async data => {
  const refinedKeywords = await superagent.get('/ebay/refineKeywords').query({data});
  return refinedKeywords;
};

export const callFindingAPI = async keywords => {
  const searchResults = await superagent.get('/ebay/findItem').query({keywords});
  return searchResults.body[0].item;
};
