import { userIdParams } from '~/controller/user/schema';
import { ApiResult, DbResult, Exception, dataFound, dbError, jsonHttp } from '../../helpers';
import { UserRepository } from './repository';

class UserCore {
    private userRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    @Exception()
    public async getUserList(): Promise<ApiResult> {
        const userList: DbResult = await this.userRepository.getUserList();
        if (userList.success) return dbError(userList);

        return dataFound(userList);
    }

    @Exception()
    public async getUserById(params: userIdParams): Promise<ApiResult> {
        console.log(params, 'params')
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export { UserCore };