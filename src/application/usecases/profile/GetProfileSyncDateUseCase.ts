import type { IProfileRepository } from "../../../domain/repositories/IProfileRepository";

export class GetProfileSyncDateUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(userId: string): Promise<string | undefined> {
    return this.profileRepository.getProfileSyncDate(userId);
  }
}
