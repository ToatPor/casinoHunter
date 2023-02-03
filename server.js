const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const db = process.env.db.replace('<password>', process.env.db_password);
mongoose.set('strictQuery', true).connect(db);

const server = app.listen(+process.env.port || 8000, () => {
  console.log('welcome to server');
});

// process.on('SIGTERM', (err) => {
//   server.close(() => {
//     process.exit(1);
//   });
// });
