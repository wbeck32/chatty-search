const chai = require('chai');
const assert = chai.assert;
const connect = require('../connect');
const connection = require('mongoose').connection;
const req = require('../helpers/request');
const photos = require('../helpers/imageurls.json');

describe('image mongoose tests', () => {
  before(async () => {
    await connect();
    await connection.dropDatabase();
  });

  const testPhotoOne = {
    title: photos[0].title,
    url:
      'https://www.flickr.com/photos/' + photos[0].owner + '/' + photos[0].id,
    alt: 'alt text',
    description: 'description'
  };

  const testPhotoTwo = {
    title: photos[1].title,
    url:
      'https://www.flickr.com/photos/' + photos[1].owner + '/' + photos[1].id,
    alt: 'alt text',
    description: 'description'
  };

  it('DELETE image by id', async () => {
    const responseInPost = await req.post('/api/images').send(testPhotoTwo);
    const responseAfterDelete = await req
      .delete('/api/images')
      .query({ _id: responseInPost.body._id });
    assert.equal(1, responseAfterDelete.body.ok);
  }),
    it('POST image', async () => {
      const responseInPost = await req.post('/api/images').send(testPhotoOne);
      assert.equal(200, responseInPost.status);
    }),
    it('GET all images', async () => {
      const responseInGet = await req.get('/api/images');
      assert.equal(200, responseInGet.status);
      assert.equal(1, responseInGet.body.length);
    });
});
