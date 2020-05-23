import request from 'supertest';
import app from '../app';
import * as statusCodes from '../constants/statusCodes';
import { urlPrefix } from '../__mocks__/variables';

describe('Tickets', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
  });
  jest.setTimeout(30000);
  describe('create a ticket', () => {
    test('should create a ticket successfully', async () => {
      const ticket = {
        name: 'ticket name',
        dob: '2000-02-02',
      };
      const res = await request(app)
        .post(`${urlPrefix}/tickets`)
        .send(ticket)
      expect(res.status).toBe(statusCodes.CREATED);
      expect(res.body.status).toBe(statusCodes.CREATED);
      expect(res.body.ticket).toHaveProperty('name');
    });

    test('should return a `Bad Request`', async () => {
      const ticket = {
        name: 'ticket name',
      };
      const res = await request(app)
        .post(`${urlPrefix}/tickets`)
        .send(ticket)
      expect(res.status).toBe(statusCodes.BAD_REQUEST);
      expect(res.body.message).toBe('Bad Request');
    });
  });

  describe('retreive all tickets', () => {
    test('should return `Tickets array`', async () => {
      const res = await request(app).get(`${urlPrefix}/tickets`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.tickets).toBeDefined();
    });
  });

  describe("retreive the today's tickets", () => {
    test('should return `Tickets array`', async () => {
      const res = await request(app).get(`${urlPrefix}/tickets/today`);
      expect(res.status).toBe(statusCodes.OK);
      expect(res.body.tickets).toBeDefined();
    });
  });
});
