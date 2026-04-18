import { GoogleGenerativeAI } from '@google/generative-ai';
import { MockAIService } from './mockAi.service';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class AIService {
  static async generateWorkflow(prompt: string) {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_actual_api_key_here') {
      return MockAIService.generateWorkflow(prompt);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `
      You are an expert workflow architect. Your task is to convert a natural language description into a structured workflow JSON.
      The workflow consists of nodes and edges for a DAG (Directed Acyclic Graph).
      
      Node structure:
      {
        "id": string,
        "type": "trigger" | "action" | "condition",
        "data": { "label": string },
        "position": { "x": number, "y": number }
      }
      
      Edge structure:
      {
        "id": string,
        "source": string,
        "target": string,
        "animated": boolean
      }

      The workflow should always start with a trigger node.
      Return ONLY a valid JSON object with "name", "nodes", and "edges" keys.
      Do not include any markdown formatting or explanations.
    `;

    const result = await model.generateContent([systemPrompt, prompt]);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Clean potential markdown code blocks if AI included them
      const cleanJson = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (err) {
      console.error('Failed to parse AI response:', text);
      throw new Error('AI generated an invalid workflow structure');
    }
  }
}
