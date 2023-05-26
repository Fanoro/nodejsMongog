const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const LOCALHOST = '0.0.0.0';

if (!PORT) {
  throw new Error('PORT not found in environment variables');
}

module.exports = { PORT, LOCALHOST };
