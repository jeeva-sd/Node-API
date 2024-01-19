import { RepoGuard, RepoResult } from 'utils';
import { db } from '~/database';
import { UserCount } from './type';

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

    @RepoGuard
    public async getUserList(): Promise<RepoResult<UserCount[]>> {
        const userCount = await db.user.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return { data: userCount };
    }
}

export { UserRepository };