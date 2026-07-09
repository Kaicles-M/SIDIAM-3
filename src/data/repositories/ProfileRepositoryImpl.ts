import type { SupabaseClient } from "@supabase/supabase-js";
import type { IProfileRepository } from "../../domain/repositories/IProfileRepository";

export class ProfileRepositoryImpl implements IProfileRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getProfileSyncDate(userId: string): Promise<string | undefined> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("updated_at")
      .eq("id", userId)
      .maybeSingle<{ updated_at?: string }>();

    if (error) {
      throw error;
    }

    return data?.updated_at;
  }
}
