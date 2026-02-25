import {
  StreamVideoClient,
  User as StreamUser,
} from '@stream-io/video-react-native-sdk';

export class StreamService {
  private client: StreamVideoClient | null = null;
  
  async initialize(userId: string, userName: string, token: string) {
    const user: StreamUser = {
      id: userId,
      name: userName,
    };

    const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
    this.client = new StreamVideoClient({ apiKey, user, token });
    
    return this.client;
  }

  async createCall(callId: string, callType = 'livestream') {
    if (!this.client) throw new Error('Stream client not initialized');
    
    const call = this.client.call(callType, callId);
    await call.create({
      data: {
        members: [],
        settings_override: {
          audio: {
            default_device: 'speaker',
          },
          video: {
            enabled: true,
          },
        },
      },
    });
    
    return call;
  }

  async joinCall(callId: string, callType = 'livestream') {
    if (!this.client) throw new Error('Stream client not initialized');
    
    const call = this.client.call(callType, callId);
    await call.join();
    
    return call;
  }

  async leaveCall(call: any) {
    await call.leave();
  }

  disconnect() {
    if (this.client) {
      this.client.disconnectUser();
      this.client = null;
    }
  }
}

export const streamService = new StreamService();