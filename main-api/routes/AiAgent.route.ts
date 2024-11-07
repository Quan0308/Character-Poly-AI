export const AiAgentRoutesV1 = [
  {
    method: 'get',
    route: '/agent/welcoming',
    controller: 'AiAgentControllerV1',
    action: 'welcoming',
  },
];

export const AiAgentRoutesV3 = [
  {
    method: 'post',
    route: '/agent/chatting',
    controller: 'AiAgentControllerV3',
    action: 'chat',
  },
];
