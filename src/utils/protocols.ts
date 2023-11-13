import { Participant } from '@prisma/client';

type ErrorMessage = { message: string };
export type ErrorCodes = { [code: number]: ErrorMessage };
export type AppError = ErrorMessage & { code: number };
export type ParticipantInput = Pick<Participant, 'name' | 'balance'>;
export type ParticipantParams = Omit<Participant, 'id'>;
