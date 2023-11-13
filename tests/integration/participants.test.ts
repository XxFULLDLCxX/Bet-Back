import httpStatus from 'http-status';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { cleanDb } from '../helpers';
import { buildParticipant, generateParticipant } from '../factories/participants.factory';
import app from '@/app';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /participants', () => {
  it('should respond with a status 201', async () => {
    const participant = generateParticipant();
    const { status, body } = await server.post('/participants').send(participant);
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual(expect.objectContaining(participant));
  });
  it('should respond with a status 400 if the balance is less than 1000', async () => {
    const participant = generateParticipant(faker.number.int({ max: 999 }));
    const { status, body } = await server.post('/participants').send(participant);
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body).toEqual({});
  });
  it('should respond with a status 422 if fields are invalid.', async () => {
    const { status, body } = await server.post('/participants').send({});
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(body).toEqual({});
  });
});

describe('GET /participants', () => {
  it('should return an array of participants', async () => {
    const { id, balance, name } = await buildParticipant();
    const response = await server.get('/participants');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ id, balance, name })]));
  });

  it('should each participant should have the correct fields', async () => {
    const participants = [await buildParticipant(), await buildParticipant(), await buildParticipant()];
    const response = await server.get('/participants');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      participants.map(({ id, balance, name }) => expect.objectContaining({ id, balance, name })),
    );
  });
  it('should return an empty array when not has a participants', async () => {
    const response = await server.get('/participants');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
