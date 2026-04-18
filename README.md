# FlowForge AI Orchestrator MVP

FlowForge is a real-time multi-tenant workflow orchestration engine designed for modern teams. This MVP demonstrates the core visual orchestration, real-time monitoring, and AI-powered workflow generation.

## 🚀 Rapid Development & Tech Decisions

This project was built to MVP status in a 12-hour sprint. Key technical choices include:

- **Frontend**: React + Vite (TS) for high-performance UI and instant developer feedback.
- **Backend**: Node.js + Express (TS) for a unified JavaScript/TypeScript stack.
- **Visual DAG**: `@xyflow/react` (formerly React Flow) for industry-led workflow visualization.
- **Charts**: `recharts` for responsive, glassmorphism-ready analytics.
- **AI Integration**: A mocked AI Architect logic with pre-defined use cases to demonstrate natural-language-to-DAG conversion.
- **Data Layer**: Robust mock data with `axios` interaction to simulate real-world API overhead and latency.

## 🛠 Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation

1. **Clone & Install Dependencies**
   ```bash
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5001
   JWT_SECRET=flowforge_secret_key_2024
   ```

3. **Run the Application**
   ```bash
   # Terminal 1: Run Backend
   cd server && npm run dev
   
   # Terminal 2: Run Frontend
   cd client && npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 🧪 Testing

We use **Playwright** for E2E testing of critical user flows.

```bash
npx playwright test
```

## 🚢 Deployment Guide

1. **Production Build**
   ```bash
   # Build client
   cd client && npm run build
   
   # Server is already TS-ready (use ts-node or compile with tsc)
   cd server && npm run start
   ```

2. **Dockerization**
   A `Dockerfile` is provided for containerized deployment (multi-stage build).

---
© 2026 FlowForge AI
