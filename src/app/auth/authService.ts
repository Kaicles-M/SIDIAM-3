import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, type ProfileRecord } from "../../lib/supabase";
import type { AuthUser, LoginPayload } from "./authTypes";

function getFriendlyErrorMessage(error: unknown) {
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

async function getProfile(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
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

function toAuthUser(user: User, profile: ProfileRecord): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    name: profile.name,
    role: profile.role,
    schoolName: profile.school_name,
  };
}

export async function resolveSessionUser(session: Session | null) {
  if (!session?.user) {
    return null;
  }

  const profile = await getProfile(session.user.id);
  return toAuthUser(session.user, profile);
}

export async function signIn({ email, password }: LoginPayload) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw error;
    }

    if (!data.session || !data.user) {
      throw new Error("Nao foi possivel iniciar sua sessao no Supabase.");
    }

    return await resolveSessionUser(data.session);
  } catch (error) {
    try {
      await getSupabaseClient().auth.signOut();
    } catch {
      // no-op
    }

    throw new Error(getFriendlyErrorMessage(error));
  }
}

export async function signOut() {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Nao foi possivel encerrar a sessao agora.");
  }
}

export async function getCurrentUser() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return await resolveSessionUser(data.session);
  } catch (error) {
    throw new Error(getFriendlyErrorMessage(error));
  }
}

export function onAuthStateChange(callback: (user: AuthUser | null, errorMessage?: string) => void) {
  const supabase = getSupabaseClient();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    try {
      const user = await resolveSessionUser(session);
      callback(user);
    } catch (error) {
      await supabase.auth.signOut();
      callback(null, getFriendlyErrorMessage(error));
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}
