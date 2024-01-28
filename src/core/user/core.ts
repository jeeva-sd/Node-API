import { repoError, dataFound, CoreGuard, ResponseX, dataList } from 'utils';
import { userIdParams } from '~/controllers/user';
import { jsonHttp } from '~/services';
import { UserRepository } from './repository';

class UserCore {
    private userRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    @CoreGuard
    public async getUserList(): Promise<ResponseX> {
        const userList = await this.userRepository.getUserList();
        if (!userList.success) return repoError(userList);
        return dataList(userList.data);
    }

    @CoreGuard
    public async getUserById(params: userIdParams): Promise<ResponseX> {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export { UserCore };