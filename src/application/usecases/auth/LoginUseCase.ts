import type { IAuthRepository } from "../../../domain/repositories/IAuthRepository";
import type { AuthUser, LoginPayload } from "../../../domain/entities/AuthUser";

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(payload: LoginPayload): Promise<AuthUser | null> {
    return this.authRepository.signIn(payload);
  }
}
