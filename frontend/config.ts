import dotenv from 'dotenv';

dotenv.config();

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001';

const config = {
  backendApiUrl
};

export default config;