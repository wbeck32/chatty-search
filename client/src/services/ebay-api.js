require('dotenv')
const superagent = require('superagent');

export const checkKeywords = async data => {
  console.log(5, data);
  const refinedKeywords = await superagent.get('/ebay/refineKeywords').query({data});
  return refinedKeywords;
};

export const callFindingAPI = async keywords => {
  console.log(7, keywords);
  const searchResults = await superagent.get('/ebay/findItem').query({keywords});
  console.log(345,searchResults.body[0].item)
  return searchResults.body[0].item;
};
