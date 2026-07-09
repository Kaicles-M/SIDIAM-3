import type { SupabaseClient, User, Session } from "@supabase/supabase-js";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { AuthUser, LoginPayload } from "../../domain/entities/AuthUser";
import type { ProfileRecord } from "../datasources/supabase";
import { toAuthUser } from "../models/AuthUserMapper";

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private getFriendlyErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      const normalized = error.message.toLowerCase();

      if (normalized.includes("invalid login credentials")) {
        return "E-mail ou senha invalidos.";
      }

      if (normalized.includes("email not confirmed")) {
        return "Seu e-mail ainda nao foi confirmado. Verifique a caixa de entrada antes de continuar.";
      }

      if (normalized.includes("fetch")) {
        return "Nao foi possivel acessar o Supabase. Verifique sua conexao e as configuracoes do projeto.";
      }

      return error.message;
    }

    return "Nao foi possivel concluir a autenticacao agora.";
  }

  private async getProfile(userId: string): Promise<ProfileRecord> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("id, name, role, school_name")
      .eq("id", userId)
      .maybeSingle<ProfileRecord>();

    if (error) {
      throw new Error("Nao foi possivel carregar o perfil do usuario.");
    }

    if (!data) {
      throw new Error("Seu usuario foi autenticado, mas ainda nao possui perfil liberado no SIDIAM.");
    }

    return data;
  }

  private async resolveSessionUser(session: Session | null): Promise<AuthUser | null> {
    if (!session?.user) {
      return null;
    }

    const profile = await this.getProfile(session.user.id);
    return toAuthUser(session.user, profile);
  }

  async signIn({ email, password }: LoginPayload): Promise<AuthUser | null> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.session || !data.user) {
        throw new Error("Nao foi possivel iniciar sua sessao no Supabase.");
      }

      return await this.resolveSessionUser(data.session);
    } catch (error) {
      try {
        await this.supabase.auth.signOut();
      } catch {
        // no-op
      }

      throw new Error(this.getFriendlyErrorMessage(error));
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new Error("Nao foi possivel encerrar a sessao agora.");
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data, error } = await this.supabase.auth.getSession();

      if (error) {
        throw error;
      }

      return await this.resolveSessionUser(data.session);
    } catch (error) {
      throw new Error(this.getFriendlyErrorMessage(error));
    }
  }

  onAuthStateChange(
    callback: (user: AuthUser | null, errorMessage?: string) => void
  ): () => void {
    const {
      data: { subscription },
    } = this.supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const user = await this.resolveSessionUser(session);
        callback(user);
      } catch (error) {
        await this.supabase.auth.signOut();
        callback(null, this.getFriendlyErrorMessage(error));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }
}
