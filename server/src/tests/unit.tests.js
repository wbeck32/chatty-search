const Image = require('../models/Image');
const { assert } = require('chai');
const photos = require('../helpers/imageurls.json');

describe('Image model tests', () => {
  const testPhotoInvalid = new Image({
    url:
      'https://www.flickr.com/photos/' + photos[0].owner + '/' + photos[0].id,
    alt: 'alt text',
    description: 'description'
  });

  const testPhotoValid = new Image({
    title: 'this is a valid image',
    url:
      'https://www.flickr.com/photos/' + photos[1].owner + '/' + photos[1].id,
    alt: 'alt text',
    description: 'description'
  });

  it('image model fails validation', async () => {
    const failValidate = await testPhotoInvalid
      .validate(response => {
        return response;
      })
      .catch(response => {
        assert.equal(response.errors.title.name, 'ValidatorError');
        assert.equal(
          response.errors.title.message,
          'Path `title` is required.'
        );
        ({ errors }) => {
          // console.log('errors: ', errors);
        };
      });
  }),
    it('image model passes validation', async () => {
      const passValidate = await testPhotoValid
        .validate(response => {
          assert.equal(null, response);
        })
        .catch(() => {
          throw (new Error('Validation errors'),
          ({ errors }) => {
            // console.log('errors: ', errors);
          });
        });
    });
});

describe('Album model tests', () => {
  it('album model fails validation', () => {}),
    it('album model passes validation', () => {});
});
