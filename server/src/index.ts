import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware, tenantIsolation } from './middleware/auth';
import apiRoutes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use(tenantIsolation);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`FlowForge Server running on http://localhost:${PORT}`);
});
