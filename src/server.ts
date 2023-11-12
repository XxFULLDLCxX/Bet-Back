import app from './app';

const port = +process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is listening on port ${port}...`));
process.on('SIGINT', () => {
  console.log(' - Received SIGINT. Shutting down gracefully...');
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
