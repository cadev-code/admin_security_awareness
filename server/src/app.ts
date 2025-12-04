import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import auth_routes from '../src/routes/auth.routes';
import modules_routes from '../src/routes/modules.routes';

import { errorHandler } from './middlewares';

const app = express();
const PORT = 8080;

dotenv.config(); // Load environment variables

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // CORS configuration
app.use(cookieParser()); // Middleware for parsing cookies

app.use(express.json()); // Middleware for parsing JSON request bodies

app.use(auth_routes);
app.use(modules_routes);

app.use(errorHandler); // Global error handling middleware

app.listen(PORT, () => {});
