import { AuthError, AuthResponse } from '../types/auth.types';

const STORAGE_KEY = 'kanban_users';
const TOKEN_KEY = 'kanban_token';
const USER_KEY = 'kanban_user';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function generateToken(userId: string): string {
  return btoa(`${userId}:${Date.now()}`);
}

class AuthServiceError extends Error {
  constructor(public code: AuthError) {
    super(code);
    this.name = 'AuthServiceError';
  }
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email === email && u.passwordHash === btoa(password)
    );

    if (!found) {
      throw new AuthServiceError('INVALID_CREDENTIALS');
    }

    const token = generateToken(found.id);
    const user = { id: found.id, name: found.name, email: found.email };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token, user };
  },

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const users = getStoredUsers();
    const exists = users.some((u) => u.email === email);

    if (exists) {
      throw new AuthServiceError('EMAIL_ALREADY_EXISTS');
    }

    const newUser: StoredUser = {
      id: generateId(),
      name,
      email,
      passwordHash: btoa(password),
    };

    saveStoredUsers([...users, newUser]);

    const token = generateToken(newUser.id);
    const user = { id: newUser.id, name: newUser.name, email: newUser.email };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token, user };
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getStoredSession(): { token: string | null; user: import('../types/auth.types').User | null } {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);
    const user = userRaw
      ? (JSON.parse(userRaw) as import('../types/auth.types').User)
      : null;
    return { token, user };
  },
};

export { AuthServiceError };
