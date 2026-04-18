import type { Response } from 'express';

class SSEManager {
  private clients: Response[] = [];

  addClient(res: Response) {
    this.clients.push(res);
    res.on('close', () => {
      this.clients = this.clients.filter(c => c !== res);
    });
  }

  broadcast(data: any) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    this.clients.forEach(client => client.write(payload));
  }
}

export const sseManager = new SSEManager();
