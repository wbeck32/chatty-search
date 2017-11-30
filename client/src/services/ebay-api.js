require('dotenv')
const superagent = require('superagent');

export const checkKeywords = async message => {
  console.log(989, message)

  const refinedKeywords = await superagent.get('/ebay/refineKeywords').query(message);
  message
  console.log(989, refinedKeywords)
  return refinedKeywords;
};

export const callFindingAPI = async keywords => {
  const searchResults = await superagent.get('/ebay/findItem').query({keywords});
  return searchResults.body[0].item;
};
