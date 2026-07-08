import { clearStoredSession, getStoredSession, getStoredUsers, setStoredSession } from "./authStorage";
import type { AuthUser, LoginPayload } from "./authTypes";

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function signIn({ email, password }: LoginPayload) {
  await wait(500);

  const normalizedEmail = email.trim().toLowerCase();
  const user = getStoredUsers().find(
    (storedUser) => storedUser.email.toLowerCase() === normalizedEmail && storedUser.password === password,
  );

  if (!user) {
    throw new Error("E-mail ou senha invalidos.");
  }

  const sessionUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    schoolName: user.schoolName,
  };

  setStoredSession(sessionUser);
  return sessionUser;
}

export async function signOut() {
  await wait(150);
  clearStoredSession();
}

export async function getCurrentUser() {
  await wait(150);
  return getStoredSession();
}
