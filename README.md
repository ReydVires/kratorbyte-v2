# FlowForge AI Orchestrator

FlowForge is a real-time multi-tenant workflow orchestration engine designed for modern teams. It features a high-performance visual DAG visualizer, real-time metrics monitoring, and a state-of-the-art AI Architect for natural-language-to-workflow generation.

## 🚀 Technology Stack

- **Frontend**: React + Vite (TS), `@xyflow/react` for DAG visualization.
- **Backend**: Node.js + Express (TS).
- **Database**: PostgreSQL/SQLite managed by **Prisma ORM**.
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
We utilize a **Structured System Prompting** strategy to enforce rigid schema compliance. Our system prompt:
- **Defines the Schema**: Explicitly defines the JSON structure for Nodes and Edges compatible with `@xyflow/react`.
- **Enforces Constraints**: Mandates that every workflow starts with a `trigger` node and ensures logical flow (Trigger -> Action/Condition).
- **Isolation**: Instructs the model to output *only* raw JSON, preventing conversational filler from breaking the parser.

### Token Management
To optimize cost, latency, and reliability, we employ:
- **Model Selection**: We use `gemini-1.5-flash` for its optimal balance of speed and complex reasoning.
- **Input Sanitization**: Client-side and server-side character limits (2,000 characters) ensure prompts stay within efficient processing windows and prevent "prompt injection" or token overflow.

### LLM Output Guardrails
To prevent malformed or invalid workflows from crashing the UI, we implement a multi-layered guard system:
1. **Syntactic Guard**: A regex-based post-processor removes potential Markdown code blocks (e.g., ` ```json `) before parsing.
2. **Structural Validation**: After JSON parsing, we verify the existence of mandatory keys (`nodes`, `edges`).
3. **Graceful Fallbacks**: If parsing fails or structural validation is unsatisfied, the system throws a descriptive error and logs the malformed response for debugging, while the UI prompts the user to refine their request.

## 🧪 Testing

We use **Playwright** for E2E testing. 

```bash
# Run tests
npx playwright test
```

---
© 2026 FlowForge AI
