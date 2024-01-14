import { ApiResult, Exception, dataFound, dbError, jsonHttp } from '../../helpers';
import { UserRepository } from './repository';

class UserCore {
    private userRepository;

    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    @Exception()
    public async getUserList(): Promise<ApiResult> {
        const userList: any = await this.userRepository.getUserList();
        if (userList.error) return dbError(userList);

        return dataFound(userList);
    }

    @Exception()
    public async getUserById(params: any): Promise<ApiResult> {
        console.log(params)
        const userResponse = await jsonHttp.get(`/users/${params.userId}`);
        return dataFound(userResponse);
    }
}

export { UserCore };