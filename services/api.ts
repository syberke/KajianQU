const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Quran AI endpoints
  async startAISession(sessionData: any) {
    return this.request('/api/quran-ai/start', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async stopAISession(sessionId: string) {
    return this.request(`/api/quran-ai/stop/${sessionId}`, {
      method: 'POST',
    });
  }

  // Stream endpoints
  async createLiveRoom(roomData: any) {
    return this.request('/api/stream/create-room', {
      method: 'POST',
      body: JSON.stringify(roomData),
    });
  }

  async joinLiveRoom(roomId: string) {
    return this.request(`/api/stream/join-room/${roomId}`, {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();