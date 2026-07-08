import type { AuthUser, StoredAuthUser } from "./authTypes";

const USERS_KEY = "sidiam.auth.users";
const SESSION_KEY = "sidiam.auth.session";

const defaultUsers: StoredAuthUser[] = [
  {
    id: "teacher-001",
    name: "Patricia Moura",
    email: "professor@escola.edu.br",
    password: "123456",
    role: "Professor(a)",
    schoolName: "Escola Municipal Horizonte",
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredUsers() {
  if (!isBrowser()) {
    return defaultUsers;
  }

  const rawUsers = window.localStorage.getItem(USERS_KEY);
  if (!rawUsers) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    return JSON.parse(rawUsers) as StoredAuthUser[];
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

export function getStoredSession() {
  if (!isBrowser()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(SESSION_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthUser;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setStoredSession(user: AuthUser) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearStoredSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}
