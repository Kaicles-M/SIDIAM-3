import type { AuthUser, LoginPayload } from "../entities/AuthUser";

export interface IAuthRepository {
  signIn(payload: LoginPayload): Promise<AuthUser | null>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  onAuthStateChange(
    callback: (user: AuthUser | null, errorMessage?: string) => void
  ): () => void;
}
