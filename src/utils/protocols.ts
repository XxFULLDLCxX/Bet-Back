import { Bet, Game, Participant } from '@prisma/client';

type ErrorMessage = { message: string };
export type ErrorCodes = { [code: number]: ErrorMessage };
export type AppError = ErrorMessage & { code: number };
export type ParticipantInput = Pick<Participant, 'name' | 'balance'>;
export type ParticipantParams = Omit<Participant, 'id'>;
export type GameStartInput = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type GameFinishInput = Pick<Game, 'homeTeamScore' | 'awayTeamScore'>;
export type GameParams = Omit<Game, 'id'>;
export type BetInput = Pick<Bet, 'homeTeamScore' | 'awayTeamScore' | 'amountBet' | 'gameId' | 'participantId'>;
export type BetParams = Omit<BetInput & Partial<Pick<Bet, Exclude<keyof Bet, keyof BetInput>>>, 'id'>;
