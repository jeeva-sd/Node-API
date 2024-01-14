import { userIdParams } from '~/controllers/v1/user';
import { dbError, dataFound, jsonHttp, Exception, ApiResult, DbResult } from 'helpers';
import { UserRepository } from './repository';

class UserCore {
    private userRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    @Exception()
    public async getUserList(): Promise<ApiResult> {
        const userList: DbResult = await this.userRepository.getUserList();
        if (!userList.success) return dbError(userList);

        return dataFound(userList);
    }

    @Exception()
    public async getUserById(params: userIdParams): Promise<ApiResult> {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export { UserCore };