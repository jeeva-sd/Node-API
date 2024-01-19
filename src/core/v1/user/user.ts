import { dbError, dataFound, jsonHttp, Exception, ResponseX, DbResult } from 'utils';
import { userIdParams } from '~/controllers/v1/user';
import { UserRepository } from './repository';

class UserCore {
    private userRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    @Exception()
    public async getUserList(): Promise<ResponseX> {
        const userList: DbResult = await this.userRepository.getUserList();
        if (!userList.success) return dbError(userList);

        return dataFound(userList);
    }

    @Exception()
    public async getUserById(params: userIdParams): Promise<ResponseX> {
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export { UserCore };