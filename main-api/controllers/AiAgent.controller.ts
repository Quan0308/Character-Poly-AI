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
      const cozeStream = await this.aiAgentService.chatStream(
        req.query.message as string
      );
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      let buffer = '';

      cozeStream.on('data', (chunk: Buffer) => {
        buffer += chunk.toString();
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';
        events.forEach((event) => {
          if (event.trim() !== '') {
            const eventMatch = event.match(/event:(.*)\ndata:(.*)/s);
            if (eventMatch) {
              const eventName = eventMatch[1].trim();
              const eventData = eventMatch[2].trim();
              if (eventName !== '') {
                res.write(`event: ${eventName}\n`);
                res.write(`data: ${eventData}\n\n`);
              }
            } else {
              res.write(`data: ${event}\n\n`);
            }
          }
        });
      });

      cozeStream.on('end', () => {
        console.log('Stream ended');
        res.end();
      });

      cozeStream.on('error', (error: Error) => {
        console.error('Stream error:', error);
        res.status(500).json({ error: 'Streaming error' });
        res.end();
      });
    } catch (error) {
      next(error);
    }
  }
}
