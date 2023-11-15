import dotenv from 'dotenv';

dotenv.config();

// const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001';
const apiUrl = 'http://localhost:5001';

const config = {
  apiUrl,
  usersEndpoint: `${apiUrl}/users`,
};

export default config;