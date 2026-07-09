export interface IProfileRepository {
  getProfileSyncDate(userId: string): Promise<string | undefined>;
}
