import httpStatus from 'http-status';
import supertest from 'supertest';
import { Game } from '@prisma/client';
import { cleanDb } from '../helpers';
import {
  buildStartGame,
  generateFinishGameInput,
  generateStartGame,
  generateStartGameInput,
} from '../factories/games.factory';
import { buildParticipant, checkParticipant } from '../factories/participants.factory';
import { buildBet } from '../factories/bets.factory';
import app from '@/app';

const server = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

describe('POST /games', () => {
  it('should respond with a status 201', async () => {
    const game = generateStartGameInput();
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

const createScenery = async (game: Game) => {
  const participants = [await buildParticipant(1000), await buildParticipant(2000), await buildParticipant(3000)];
  const bets = [
    await buildBet(game.id, 1000, participants[0].id, game.homeTeamScore, game.awayTeamScore),
    await buildBet(game.id, 2000, participants[1].id, game.homeTeamScore, game.awayTeamScore),
    await buildBet(game.id, 3000, participants[2].id, game.homeTeamScore + 1, game.awayTeamScore - 1),
  ];
  return { participants, bets };
};

describe('POST /games/:id/finish', () => {
  describe('should respond with a status 201', () => {
    it('if the game update is successful', async () => {
      const input = generateFinishGameInput();
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      await createScenery({ ...game, ...input });
      const { status, body } = await server.post(`/games/${game.id}/finish`).send(input);
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(expect.objectContaining({ id: game.id, ...input, isFinished: true }));
    });

    it('if participants have the correct balance', async () => {
      const input = generateFinishGameInput();
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      await createScenery({ ...game, ...input });
      const { status, body } = await server.post(`/games/${game.id}/finish`).send(input);
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(expect.objectContaining({ id: game.id, ...input, isFinished: true }));
      const participants = await checkParticipant();
      console.log(participants);

      expect(participants[0].balance).toBe(1400);
      expect(participants[1].balance).toBe(2800);
      expect(participants[2].balance).toBe(0);
    });

    it('if the game update is successful', async () => {
      const input = generateFinishGameInput();
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      await createScenery({ ...game, ...input });
      const { status, body } = await server.post(`/games/${game.id}/finish`).send(input);
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(expect.objectContaining({ id: game.id, ...input, isFinished: true }));
    });
  });
  // it('should respond with a status 422 if fields are invalid.', async () => {
  //   const { status, body } = await server.post('/games').send({});
  //   expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  //   expect(body).toEqual({});
  // });
});
