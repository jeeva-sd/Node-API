import { repoError, dataFound, jsonHttp, Exception, ResponseX, RepoResult } from 'utils';
import { userIdParams } from '~/controllers/v1/user';
import { UserRepository } from './repository';

class UserCore {
    private userRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    @Exception()
    public async getUserList(): Promise<ResponseX> {
        const userList: RepoResult = await this.userRepository.getUserList();
        if (!userList.success) return repoError(userList);

        return dataFound(userList);
    }

    @Exception()
    public async getUserById(params: userIdParams): Promise<ResponseX> {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export { UserCore };