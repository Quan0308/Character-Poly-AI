import { Response, Request, NextFunction } from 'express';
import { AiAgentService } from 'main-api/services/AiAgent.service';

export class AiAgentController {
  private aiAgentService: AiAgentService;

  constructor(aiAgentService: AiAgentService) {
    this.aiAgentService = aiAgentService;
  }

  public async welcoming(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.aiAgentService.getBotInfo();
      res.status(200).json(response);
    } catch (error) {
      console.log('next', next);
      next(error);
    }
  }

  public async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const cozeStream = await this.aiAgentService.chatStream(req.body.prompt);
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      cozeStream.on('data', (chunk: Buffer) => {
        const data = chunk.toString();
        console.log('Streaming chunk:', data);
        res.write(`data: ${data}\n\n`);
      });

      cozeStream.on('end', () => {
        console.log('Stream ended');
        res.write('event: done\n\n');
        res.end();
      });

      cozeStream.on('error', (error) => {
        console.error('Stream error:', error);
        res.status(500).json({ error: 'Streaming error' });
        res.end();
      });
    } catch (error) {
      next(error);
    }
  }
}
