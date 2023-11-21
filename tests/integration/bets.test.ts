import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { generateBet } from '../factories/bets.factory';
import { buildParticipant } from '../factories/participants.factory';
import { buildFinishGame, buildStartGame } from '../factories/games.factory';
import app from '@/app';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /bets', () => {
  it('should respond with a status 201', async () => {
    const { id: participantId } = await buildParticipant(1500);
    const { id: gameId } = await buildStartGame();
    const bet = generateBet({ amountBet: 1000, gameId, participantId });
    const { status, body } = await server.post('/bets').send(bet);
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toEqual(expect.objectContaining(bet));
  });
  describe('should respond with a status 404', () => {
    it('if the participant ID is an invalid number', async () => {
      const { id: gameId } = await buildStartGame();
      const bet = generateBet({ amountBet: 2000, gameId, participantId: 0 });
      const { status, body } = await server.post('/bets').send(bet);
      expect(status).toBe(httpStatus.NOT_FOUND);
      expect(body).toEqual({});
    });
    it('if the game ID is an invalid number', async () => {
      const { id: participantId } = await buildParticipant(1500);
      const bet = generateBet({ amountBet: 2000, gameId: 0, participantId });
      const { status, body } = await server.post('/bets').send(bet);
      expect(status).toBe(httpStatus.NOT_FOUND);
      expect(body).toEqual({});
    });
  });
  describe(`should respond with a status 400`, () => {
    it(`if the participant's balance is below the bet.`, async () => {
      const { id: gameId } = await buildStartGame();
      const { id: participantId } = await buildParticipant(1500);
      const bet = generateBet({ amountBet: 2000, gameId, participantId });
      const { status } = await server.post('/bets').send(bet);
      expect(status).toBe(httpStatus.BAD_REQUEST);
    });
    it(`if the amount is negative.`, async () => {
      const { id: gameId } = await buildStartGame();
      const { id: participantId } = await buildParticipant(1500);
      const bet = generateBet({ amountBet: -1000, gameId, participantId });
      const { status } = await server.post('/bets').send(bet);
      expect(status).toBe(httpStatus.BAD_REQUEST);
    });
  });
  it(`should return a 409 status if the game is marked as 'finished'.`, async () => {
    const { id: participantId } = await buildParticipant(1500);
    const { id: gameId } = await buildFinishGame();
    const bet = generateBet({ amountBet: 700, gameId, participantId });

    const fields = Object.keys(bet);
    const fieldToRemove = fields[Math.floor(Math.random() * fields.length)];
    delete bet[fieldToRemove];
    console.log(bet);

    const { status, body } = await server.post('/bets').send(bet);
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(body).toEqual({});
  });
  it('should respond with a status 422 if fields are invalid.', async () => {
    const { id: participantId } = await buildParticipant(1500);
    const { id: gameId } = await buildStartGame();
    const bet = generateBet({ amountBet: 700, gameId, participantId });

    const fields = Object.keys(bet);
    const fieldToRemove = fields[Math.floor(Math.random() * fields.length)];
    delete bet[fieldToRemove];

    const { status, body } = await server.post('/bets').send(bet);

    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(body).toEqual({});
  });
});
