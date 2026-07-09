import type { User } from "@supabase/supabase-js";
import type { ProfileRecord } from "../datasources/supabase";
import type { AuthUser } from "../../domain/entities/AuthUser";

export function toAuthUser(user: User, profile: ProfileRecord): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    name: profile.name,
    role: profile.role,
    schoolName: profile.school_name,
  };
}
