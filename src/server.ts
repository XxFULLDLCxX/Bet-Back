import app from '@/app';

const port = parseInt(process.env.PORT || '', 10) || 5000;

if (isNaN(port) || port < 0 || port > 65535) {
  console.error('A porta fornecida é inválida.');
  process.exit(1);
}

const server = app.listen(port, () => console.log(`Server is listening on port ${port}...`));
process.on('SIGTSTP', () => {
  console.log(' - Received SIGTSTP. Shutting down gracefully...');
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
