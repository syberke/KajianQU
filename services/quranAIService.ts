import { apiService } from './api';

export class QuranAIService {
  private websocket: WebSocket | null = null;
  private sessionId: string | null = null;

  async startSession(sessionData: {
    surah: number;
    start_ayat: number;
    end_ayat: number;
    mode: 'tahsin' | 'muroja\'ah';
  }) {
    try {
      const response = await apiService.startAISession(sessionData);
      this.sessionId = response.sessionId;
      this.connectWebSocket();
      return response;
    } catch (error) {
      console.error('Failed to start AI session:', error);
      throw error;
    }
  }

  private connectWebSocket() {
    const wsUrl = process.env.EXPO_PUBLIC_WS_URL || 'ws://localhost:3000';
    this.websocket = new WebSocket(`${wsUrl}/ws/quran-ai/${this.sessionId}`);

    this.websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleAIResponse(data);
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.websocket.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  sendAudioChunk(audioData: ArrayBuffer) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(audioData);
    }
  }

  private handleAIResponse(data: any) {
    if (data.type === 'correction') {
      // Handle correction response
      console.log('Received correction:', data);
    } else if (data.type === 'error') {
      console.error('AI Error:', data.message);
    }
  }

  async stopSession() {
    if (this.sessionId) {
      await apiService.stopAISession(this.sessionId);
      this.sessionId = null;
    }
    
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }
}

export const quranAIService = new QuranAIService();