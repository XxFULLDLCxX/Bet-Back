import { Bet, Game, Participant } from '@prisma/client';

type ErrorMessage = { message: string };
// type Optional<T, K extends keyof T> = K extends any ? { [P in K]-?: T[P] } & Partial<Omit<T, K>> : never;

export type ErrorCodes = { [code: number]: ErrorMessage };
export type AppError = ErrorMessage & { code: number };
export type ParticipantInput = Pick<Participant, 'name' | 'balance'>;
export type ParticipantParams = Omit<Participant, 'id'>;
export type GameStartInput = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type GameFinishInput = Pick<Game, 'homeTeamScore' | 'awayTeamScore'>;
export type GameParams = Omit<Game, 'id'>;
export type BetInput = Pick<Bet, 'homeTeamScore' | 'awayTeamScore' | 'amountBet' | 'gameId' | 'participantId'>;
export type BetParams = Omit<Bet, 'id'>;
