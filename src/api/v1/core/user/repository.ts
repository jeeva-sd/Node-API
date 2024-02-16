import { RepoGuard, RepoResult } from '@/utils';
import { db } from '@/services';
import { TokenData, UserRes } from '~/entities';

class UserRepository {

    @RepoGuard
    public async findUser(id: string): Promise<RepoResult<UserRes>> {
        const user = await db.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                phone: true,
                dayRate: true,
                branchId: true,
            }
        });

        return { code: user ? null : 1101, data: user };
    }

    @RepoGuard
    public async getUserList(reqUser: TokenData): Promise<RepoResult<UserRes[]>> {
        const userList = await db.user.findMany({
            where: {
                orgId: reqUser.orgId,
                branchId: reqUser.branchId,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                dayRate: true,
                branchId: true,
            }
        });

        return { data: userList };
    }
}

export { UserRepository };