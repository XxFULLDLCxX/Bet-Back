import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { generateGame } from '../factories/games.factory';
import app from '@/app';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /games', () => {
  it('should respond with a status 201', async () => {
    const game = generateGame();
    const { status, body } = await server.post('/games').send(game);
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual(expect.objectContaining(game));
  });
  it('should respond with a status 422 if fields are invalid.', async () => {
    const { status, body } = await server.post('/games').send({});
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(body).toEqual({});
  });
});
