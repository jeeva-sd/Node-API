import { repoError, CoreGuard, ResponseX, dataList } from '@/utils';
import { UserRepository } from './repository';
import { TokenData } from '~/entities';

class UserCore {
    private userRepository: UserRepository;

    @CoreGuard
    public async list(reqUser: TokenData): Promise<ResponseX> {
        const userList = await this.repoInstance().getUserList(reqUser);
        if (!userList.success) return repoError(userList);
        return dataList(userList.data);
    }

    @CoreGuard
    public async getUserById(id: string): Promise<ResponseX> {
        const userList = await this.repoInstance().findUser(id);
        if (!userList.success) return repoError(userList);
        return dataList(userList.data);
    }

    private repoInstance(): UserRepository {
        if (!this.userRepository) this.userRepository = new UserRepository();
        return this.userRepository;
    }
}

export { UserCore };