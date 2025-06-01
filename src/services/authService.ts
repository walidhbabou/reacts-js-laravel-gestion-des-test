export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
}

const TOKEN_KEY = 'auth_token';

const API_URL = 'http://localhost:8000'; // Update this to match your backend URL

const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    console.log('Appel de authService.register', data);
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    const responseData = await response.json();
    console.log('Réponse register:', responseData);
    if (responseData.token) {
      this.setToken(responseData.token);
    } else {
      console.error('Pas de token dans la réponse register');
    }
    return responseData;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    console.log('Appel de authService.login', data);
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    const responseData = await response.json();
    console.log('Réponse login:', responseData);
    if (responseData.token) {
      this.setToken(responseData.token);
    } else {
      console.error('Pas de token dans la réponse login');
    }
    return responseData;
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (!token) {
      console.log('No token found, already logged out');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      this.removeToken();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Even if logout fails, remove token locally
      this.removeToken();
      throw error;
    }
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    console.log('Token stocké');
  },

  getToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Token récupéré:', token ? 'Présent' : 'Absent');
    return token;
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    console.log('Token supprimé');
  },

  isAuthenticated(): boolean {
    const isAuth = !!this.getToken();
    console.log('Utilisateur authentifié:', isAuth);
    return isAuth;
  },

  async getUser(): Promise<AuthResponse['user']> {
    console.log('Appel de authService.getUser');
    const token = this.getToken();
    const response = await fetch(`${API_URL}/api/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      credentials: 'include'
    });
    const data = await response.json();
    console.log('Réponse getUser:', data);
    return data;
  }
};

export default authService; 