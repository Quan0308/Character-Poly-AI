import dotenv from 'dotenv';

dotenv.config();

import { cozeApiConsumerV1, cozeApiConsumerV3 } from 'libs/utils';
import { Server } from './server';
import { AiAgentService } from './services/AiAgent.service';
import { AiAgentController } from './controllers/AiAgent.controller';

const cozeApiV1 = cozeApiConsumerV1();
const aiAgentServiceV1 = new AiAgentService(cozeApiV1);

const cozeApiV3 = cozeApiConsumerV3();
const aiAgentServiceV3 = new AiAgentService(cozeApiV3);

const aiGenControllerV1 = new AiAgentController(aiAgentServiceV1);
const aiGenControllerV3 = new AiAgentController(aiAgentServiceV3);

const controllerInstances = {
  AiAgentControllerV1: aiGenControllerV1,
  AiAgentControllerV3: aiGenControllerV3,
};

const server = new Server(controllerInstances);
server.listen((port) => {
  console.log(`Server is listening on http://localhost:${port}`);
});
