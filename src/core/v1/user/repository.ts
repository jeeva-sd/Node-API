import { DbException, RepoResult } from 'utils';
import { db } from '~/database';

class UserRepository {
    private static instance: UserRepository | null = null;

    private constructor() {
        // Private constructor to prevent external instantiation
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    @DbException()
    public async getUserList(): Promise<RepoResult> {
        const data = await db.user.count();
        return { data };
    }
}

export { UserRepository };
