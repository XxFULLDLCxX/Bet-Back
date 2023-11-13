import { Game, Participant } from '@prisma/client';

type ErrorMessage = { message: string };
// type Optional<T, K extends keyof T> = K extends any ? { [P in K]-?: T[P] } & Partial<Omit<T, K>> : never;

export type ErrorCodes = { [code: number]: ErrorMessage };
export type AppError = ErrorMessage & { code: number };
export type ParticipantInput = Pick<Participant, 'name' | 'balance'>;
export type ParticipantParams = Omit<Participant, 'id'>;
export type GameInput = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type GameParams = Omit<Game, 'id'>;
