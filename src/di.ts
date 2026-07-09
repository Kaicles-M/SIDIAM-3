import { getSupabaseClient } from "./data/datasources/supabase";
import { AuthRepositoryImpl } from "./data/repositories/AuthRepositoryImpl";
import { ProfileRepositoryImpl } from "./data/repositories/ProfileRepositoryImpl";
import { LoginUseCase } from "./application/usecases/auth/LoginUseCase";
import { LogoutUseCase } from "./application/usecases/auth/LogoutUseCase";
import { GetCurrentUserUseCase } from "./application/usecases/auth/GetCurrentUserUseCase";
import { SubscribeToAuthChangesUseCase } from "./application/usecases/auth/SubscribeToAuthChangesUseCase";
import { GetProfileSyncDateUseCase } from "./application/usecases/profile/GetProfileSyncDateUseCase";

const supabase = getSupabaseClient();

// Repositories
export const authRepository = new AuthRepositoryImpl(supabase);
export const profileRepository = new ProfileRepositoryImpl(supabase);

// Use Cases
export const loginUseCase = new LoginUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
export const subscribeToAuthChangesUseCase = new SubscribeToAuthChangesUseCase(authRepository);
export const getProfileSyncDateUseCase = new GetProfileSyncDateUseCase(profileRepository);
