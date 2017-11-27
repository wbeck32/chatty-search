'use strict';
require('dotenv').config({path: '../../../'})
const req = require('superagent');
const querystring = require('querystring');

exports.chattySearch = (req, res) => {
  console.log(2, req.body);
  const data = 'arry+poter+phonix';

  return checkKeywords(data)
    .then(refined => {
      console.log(3, refined.text);
      return refined;
    })
    .then(refinedKeywords => {
      return callFindingAPI(refinedKeywords).then(results => {
        console.log(4, results.body);
        res.send(results);
      });
    });
};

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
