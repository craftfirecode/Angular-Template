import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const server = createServer(app);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

import authRoutes from './src/routes/auth.routes.js';
import foldersRoutes from './src/routes/folders.routes.js';
import todosRoutes from './src/routes/todos.routes.js';

app.use('/auth', authRoutes);
app.use('/folders', foldersRoutes);
app.use('/todos', todosRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
