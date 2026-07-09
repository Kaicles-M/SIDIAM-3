import type { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import type { AuthUser } from "../../../domain/entities/AuthUser";

export class SubscribeToAuthChangesUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  execute(
    callback: (user: AuthUser | null, errorMessage?: string) => void
  ): () => void {
    return this.authRepository.onAuthStateChange(callback);
  }
}
