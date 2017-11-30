require('dotenv')
const superagent = require('superagent');

export const checkKeywords = async message => {
  const refinedKeywords = await superagent.get('/ebay/refineKeywords').query(message);
  return refinedKeywords;
};

export const callFindingAPI = async keywords => {
  console.log(9090, keywords)
  const searchResults = await superagent.get('/ebay/findItem').query(keywords);
  return searchResults.body[0].item;
};
