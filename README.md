# FlowForge AI Orchestrator

FlowForge is a real-time multi-tenant workflow orchestration engine designed for modern teams. It features a high-performance visual DAG visualizer, real-time metrics monitoring, and a state-of-the-art AI Architect for natural-language-to-workflow generation.

## 🚀 Technology Stack

- **Frontend**: React + Vite (TS), `@xyflow/react` for DAG visualization.
- **Backend**: Node.js + Express (TS).
- **Database**: SQLite managed by **Prisma ORM**.
- **AI Engine**: Integrated with **Google Gemini 1.5 Flash**.
- **Monitoring**: Real-time updates via Server-Sent Events (SSE).

## 🛠 Setup & Installation

### Prerequisites
- Node.js (v18+)
- Prisma CLI (`npm install -g prisma`)

### Installation

1. **Clone & Install Dependencies**
   ```bash
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

2. **Database Setup**
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Environment Setup**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5001
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key_here
   DATABASE_URL="file:./dev.db"
   ```

4. **Run the Application**
   ```bash
   # Backend
   cd server && npm run dev
   
   # Frontend
   cd client && npm run dev
   ```

## 🧠 AI Architecture & Engineering

The AI Architect in FlowForge transforms natural language into structured, executable DAGs.

### Prompt Engineering Approach
We utilize a **Structured System Prompting** strategy to enforce rigid schema compliance:
- **Schema-First Context**: The system prompt explicitly defines the JSON schema for Nodes and Edges compatible with `@xyflow/react`.
- **Topological Constraints**: Mandates that every workflow starts with a `trigger` node and follows a logical graph structure (Trigger -> Actions).
- **Zero-Conversation Mode**: Instructs the model to output *only* raw JSON, preventing conversational filler or markdown artifacts from breaking the parser.

### Token Management & Optimization
To maintain performance and cost-efficiency:
- **Model Selection**: We use `gemini-1.5-flash` for its high context window and superior speed in structured data tasks.
- **Input Sanitization**: Pruning irrelevant user input and enforcing a 2,000 character limit on prompts to prevent token bloat and potential prompt injection.
- **Quota Tracking**: Real-time monitoring of token usage, reflected in the system dashboard to prevent over-utilization.

### LLM Output Guardrails
We implement a multi-layered verification system to ensure robustness:
1. **Syntactic Guard**: A post-processing layer that strips Markdown tags (e.g., ` ```json `) and hidden control characters before JSON parsing.
2. **Schema Validation**: Every generated workflow is validated against internal Prisma models and `@xyflow` requirements before being saved.
3. **Graceful Failures**: If the LLM generates an invalid graph (e.g., disconnected nodes), the system provides specific feedback to the user and suggests prompt refinements instead of crashing.

## 🐳 Docker Deployment

The application is fully containerized for easy deployment.

1. **Build and Run**
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**
   - **Frontend**: `http://localhost:3000` (Mapped to Nginx internally)
   - **Backend**: `http://localhost:5001`

3. **Docker Persistence**
   The Prisma database is persisted via a volume mapped to `./server/prisma` to ensure data survives container restarts.

## 🧪 Testing

We use **Playwright** for E2E testing to ensure workflow stability.

1. Ensure the application is up and running.
2. Run tests from the `client` directory:
   ```bash
   cd client
   npx playwright test
   ```

---
© 2026 FlowForge AI
