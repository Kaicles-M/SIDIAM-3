import type { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import type { AuthUser } from "../../../domain/entities/AuthUser";

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<AuthUser | null> {
    return this.authRepository.getCurrentUser();
  }
}
