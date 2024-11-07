import { AxiosInstance } from 'axios';

export class AiAgentService {
  private COZE_BOT_ID: string;
  private axiosClient: AxiosInstance;

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
    this.COZE_BOT_ID = process.env.COZE_BOT_ID;
    console.log('COZE_BOT_ID', this.COZE_BOT_ID);
  }

  async getBotInfo() {
    const response = await this.axiosClient.get(`/bot/get_online_info`, {
      params: {
        bot_id: this.COZE_BOT_ID,
      },
    });

    return response.data;
  }

  async chatStream(prompt: string) {
    const response = await this.axiosClient.post(
      `/chat`,
      {
        bot_id: this.COZE_BOT_ID,
        user_id: 'user_id',
        stream: true,
        auto_save_history: true,
        additional_messages: [
          {
            role: 'user',
            content: prompt,
            content_type: 'text',
          },
        ],
      },
      { responseType: 'stream' }
    );

    return response.data;
  }
}
