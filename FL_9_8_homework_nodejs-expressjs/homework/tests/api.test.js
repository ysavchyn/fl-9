'use strict';
const { assert } = require('chai');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

const HOST = 'http://0.0.0.0:3000';

describe('Service api', () => {
  before((done) => {
    fs.createReadStream(
      path.join(__dirname, 'test-data/cars.json')
    ).pipe(
      fs.createWriteStream(
        path.join(__dirname, '../db/data.json')
      )
    )
      .on('finish', done);
  });
  describe('/car', () => {
    describe('POST', () => {
      it('will return positive result with status code: 201', async () => {
        const mock = {
          id: 33,
          brand: 'Lada',
          model: 'Sedan',
          engineVolume: 3.0,
          year: 2019
        };

        const { body, statusCode } = await request(HOST)
          .post('/car')
          .send(mock);

        assert.equal(statusCode, 201);
        assert.deepEqual(body, mock);
      });

      it('will return negative result with status code: 409', async () => {
        const mock = {
          id: 13,
          brand: 'Lada',
          model: 'Sedan',
          engineVolume: 3.0,
          year: 2019
        };

        const { body, statusCode } = await request(HOST)
          .post('/car')
          .send(mock)

        assert.equal(statusCode, 409);
        assert.equal(body.message, 'Car already exists.');
      });
    });

    describe('GET', () => {
      it('will return positive result with status code: 200', async () => {
        const { body, statusCode } = await request(HOST).get('/car');

        assert.equal(statusCode, 200);
        assert.exists(body);
      });
    });
  });

  describe('/car/{id}', () => {
    describe('GET', () => {
      it('will return positive result with status code: 200', async () => {
        const { body, statusCode } = await request(HOST).get('/car/13');
        const mock = {
          id: 13,
          brand: 'Porsche',
          model: 'Boxster',
          engineVolume: 2.9,
          year: 2001
        };

        assert.equal(statusCode, 200);
        assert.deepEqual(body, mock);
      });

      it('will return negative result with status code: 404', async () => {
        const { statusCode } = await request(HOST).get('/car/113');

        assert.equal(statusCode, 404);
      });
    });

    describe('PUT', () => {
      it('will return positive result with status code: 200', async () => {
        const mock = {
          id: 13,
          brand: 'Porsche',
          model: 'UpdatedModel',
          engineVolume: 2.9,
          year: 2001
        };

        const { body, statusCode } = await request(HOST)
          .put('/car/13')
          .send(mock);

        assert.equal(statusCode, 200);
        assert.deepEqual(body, mock);
      });

      it('will return negative result with status code: 404', async () => {
        const mock = {
          id: 113,
          brand: 'Porsche',
          model: 'UpdatedModel',
          engineVolume: 2.9,
          year: 2001
        };

        const { statusCode } = await request(HOST)
          .put('/car/113')
          .send(mock);

        assert.equal(statusCode, 404);
      });
    });

    describe('DELETE', () => {
      it('will return positive result with status code: 200', async () => {
        const { body, statusCode } = await request(HOST)
          .delete('/car/5')
          .set('Authorization', 'X-Password qwerty');

        assert.equal(statusCode, 200);
        assert.equal(body.message, 'The car has been successfully removed');
      });

      it('will return negative result with status code: 404', async () => {
        const { statusCode } = await request(HOST)
          .delete('/car/5')
          .set('Authorization', 'X-Password qwerty');

        assert.equal(statusCode, 404);
      });

      it('will return negative result with status code: 401', async () => {
        const { statusCode } = await request(HOST).delete('/car/5');

        assert.equal(statusCode, 401);
      });
    });
  });
});
