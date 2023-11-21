import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import {
  buildFinishGame,
  buildStartGame,
  generateFinishGame,
  generateFinishGameInput,
  generateStartGame,
  generateStartGameInput,
} from '../factories/games.factory';
import { buildParticipant, checkParticipant } from '../factories/participants.factory';
import { buildBet, checkBets } from '../factories/bets.factory';
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

describe('POST /games/:id/finish', () => {
  describe('should respond with a status 201', () => {
    it('if the game update is successful', async () => {
      const input = generateFinishGameInput();
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      const before_participants = [
        await buildParticipant(1000),
        await buildParticipant(2000),
        await buildParticipant(3000),
      ];
      await buildBet({
        gameId: game.id,
        amountBet: 1000,
        participantId: before_participants[0].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 2000,
        participantId: before_participants[1].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 3000,
        participantId: before_participants[2].id,
        homeTeamScore: 3,
        awayTeamScore: 1,
      });

      const { status, body } = await server.post(`/games/${game.id}/finish`).send(input);
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(expect.objectContaining({ id: game.id, ...input, isFinished: true }));
    });

    it('if the bet update is successful', async () => {
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      const before_participants = [
        await buildParticipant(1000),
        await buildParticipant(2000),
        await buildParticipant(3000),
      ];
      await buildBet({
        gameId: game.id,
        amountBet: 1000,
        participantId: before_participants[0].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 2000,
        participantId: before_participants[1].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 3000,
        participantId: before_participants[2].id,
        homeTeamScore: 3,
        awayTeamScore: 1,
      });

      const { status, body } = await server
        .post(`/games/${game.id}/finish`)
        .send({ homeTeamScore: 2, awayTeamScore: 2 });
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({ id: game.id, homeTeamScore: 2, awayTeamScore: 2, isFinished: true }),
      );
      const bets = await checkBets();

      expect(bets[0].status).toBe('WON');
      expect(bets[1].status).toBe('WON');
      expect(bets[2].status).toBe('LOST');
    });

    it('if the participant update is successful', async () => {
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      const before_participants = [await buildParticipant(1), await buildParticipant(1), await buildParticipant(1)];
      await buildBet({
        gameId: game.id,
        amountBet: 1000,
        participantId: before_participants[0].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 2000,
        participantId: before_participants[1].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 3000,
        participantId: before_participants[2].id,
        homeTeamScore: 3,
        awayTeamScore: 1,
      });

      const { status, body } = await server
        .post(`/games/${game.id}/finish`)
        .send({ homeTeamScore: 2, awayTeamScore: 2 });
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({ id: game.id, homeTeamScore: 2, awayTeamScore: 2, isFinished: true }),
      );
      const participants = await checkParticipant();

      expect(participants[0].balance).toBe(1401);
      expect(participants[1].balance).toBe(2801);
      expect(participants[2].balance).toBe(1);
    });

    it('if the participant update is successful when the game is atypical (only wins)', async () => {
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      const before_participants = [await buildParticipant(1), await buildParticipant(1), await buildParticipant(1)];
      await buildBet({
        gameId: game.id,
        amountBet: 1000,
        participantId: before_participants[0].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 2000,
        participantId: before_participants[1].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 3000,
        participantId: before_participants[2].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });

      const { status, body } = await server
        .post(`/games/${game.id}/finish`)
        .send({ homeTeamScore: 2, awayTeamScore: 2 });
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({ id: game.id, homeTeamScore: 2, awayTeamScore: 2, isFinished: true }),
      );
      const participants = await checkParticipant();

      expect(participants[0].balance - 1).toBe(1000 * (1 - 0.3));
      expect(participants[1].balance - 1).toBe(2000 * (1 - 0.3));
      expect(participants[2].balance - 1).toBe(3000 * (1 - 0.3));
    });
    it('if the participant update is successful when the game is atypical (only losts)', async () => {
      const { params } = generateStartGame();
      const game = await buildStartGame(params);
      const before_participants = [await buildParticipant(1), await buildParticipant(1), await buildParticipant(1)];
      await buildBet({
        gameId: game.id,
        amountBet: 1000,
        participantId: before_participants[0].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 2000,
        participantId: before_participants[1].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });
      await buildBet({
        gameId: game.id,
        amountBet: 3000,
        participantId: before_participants[2].id,
        homeTeamScore: 2,
        awayTeamScore: 2,
      });

      const { status, body } = await server
        .post(`/games/${game.id}/finish`)
        .send({ homeTeamScore: 3, awayTeamScore: 1 });
      expect(status).toBe(httpStatus.CREATED);
      expect(body).toEqual(
        expect.objectContaining({ id: game.id, homeTeamScore: 3, awayTeamScore: 1, isFinished: true }),
      );
      const participants = await checkParticipant();

      expect(participants[0].balance - 1).toBe(0);
      expect(participants[1].balance - 1).toBe(0);
      expect(participants[2].balance - 1).toBe(0);
    });
  });
  it(`should respond with a status 404 if the not found game`, async () => {
    const input = generateFinishGameInput();
    const { params } = generateStartGame();
    const game = await buildStartGame(params);
    const before_participants = [
      await buildParticipant(1000),
      await buildParticipant(2000),
      await buildParticipant(3000),
    ];
    await buildBet({
      gameId: game.id,
      amountBet: 1000,
      participantId: before_participants[0].id,
      homeTeamScore: 2,
      awayTeamScore: 2,
    });
    await buildBet({
      gameId: game.id,
      amountBet: 2000,
      participantId: before_participants[1].id,
      homeTeamScore: 2,
      awayTeamScore: 2,
    });
    await buildBet({
      gameId: game.id,
      amountBet: 3000,
      participantId: before_participants[2].id,
      homeTeamScore: 3,
      awayTeamScore: 1,
    });

    const { status } = await server.post(`/games/${game.id + 1}/finish`).send(input);
    expect(status).toBe(httpStatus.NOT_FOUND);
  });
  it(`should respond with a status 409 if the game is finished`, async () => {
    const { input, params } = generateFinishGame();
    const game = await buildFinishGame(params);
    const before_participants = [
      await buildParticipant(1000),
      await buildParticipant(2000),
      await buildParticipant(3000),
    ];
    await buildBet({
      gameId: game.id,
      amountBet: 1000,
      participantId: before_participants[0].id,
      homeTeamScore: 2,
      awayTeamScore: 2,
    });
    await buildBet({
      gameId: game.id,
      amountBet: 2000,
      participantId: before_participants[1].id,
      homeTeamScore: 2,
      awayTeamScore: 2,
    });
    await buildBet({
      gameId: game.id,
      amountBet: 3000,
      participantId: before_participants[2].id,
      homeTeamScore: 3,
      awayTeamScore: 1,
    });

    const { status } = await server.post(`/games/${game.id}/finish`).send(input);
    expect(status).toBe(httpStatus.CONFLICT);
  });
});

describe('GET /games', () => {
  it('should return an array of game', async () => {
    await buildStartGame();
    const response = await server.get('/games');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        isFinished: expect.any(Boolean),
      },
    ]);
  });

  it('should return an empty array when not has a game', async () => {
    const response = await server.get('/games');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
});

describe('GET /games/:id', () => {
  it('should each participant should have the correct fields', async () => {
    const participant = await buildParticipant(2000);
    const game = await buildStartGame();
    await buildBet({
      gameId: game.id,
      amountBet: 500,
      participantId: participant.id,
      homeTeamScore: 2,
      awayTeamScore: 4,
    });
    await buildBet({
      gameId: game.id,
      amountBet: 700,
      participantId: participant.id,
      homeTeamScore: 1,
      awayTeamScore: 2,
    });
    await buildBet({
      gameId: game.id,
      amountBet: 300,
      participantId: participant.id,
      homeTeamScore: 5,
      awayTeamScore: 3,
    });

    const response = await server.get(`/games/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: expect.any(String),
        awayTeamName: expect.any(String),
        homeTeamScore: expect.any(Number),
        awayTeamScore: expect.any(Number),
        isFinished: expect.any(Boolean),
        bets: expect.arrayContaining([
          expect.objectContaining({
            gameId: expect.any(Number),
            participantId: expect.any(Number),
            status: expect.any(String),
          }),
        ]),
      }),
    );
  });
  it('should respond with a status 422 if the id is invalid', async () => {
    const response = await server.get('/games/undefined');
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should respond with a status 404 if the not found game', async () => {
    const response = await server.get('/games/1');
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
});
