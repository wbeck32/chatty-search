'use strict';
require('dotenv')
const req = require('superagent');
const querystring = require('querystring');

export const checkKeywords = async data => {
  console.log(5, data);
  const refinedKeywords = await superagent.get('/refineKeywords').query(query);
  return refinedKeywords;
};

export const callFindingAPI = async keywords => {
  console.log(7, keywords.text);
  const searchResults = await superagent.get('/findItem').query(query2);
  return searchResults;
};
