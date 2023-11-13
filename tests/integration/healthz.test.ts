import httpStatus from 'http-status';
import supertest from 'supertest';
import app from '@/app';

const server = supertest(app);

describe('GET /healthz', () => {
  it('should respond with status 200 with OK! text', async () => {
    const response = await server.get('/healthz');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe('OK!');
  });
});
