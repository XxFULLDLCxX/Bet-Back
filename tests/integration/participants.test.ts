import httpStatus from 'http-status';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { cleanDb } from '../helpers';
import { generateParticipant } from '../factories/participants.factory';
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
