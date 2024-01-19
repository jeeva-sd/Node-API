import { ResponseX, Controller, Get, RequestX } from 'utils';
import { validateParams } from '~/middlewares';
import { UserCore } from '~/core/v1/user';
import { userByIdSchema, userIdParams } from './schema';

@Controller('/user')
class UserController {
    private userCore: UserCore;

    constructor() {
        this.userCore = new UserCore();
    }

    @Get('/list')
    public userList(): Promise<ResponseX> {
        return this.userCore.getUserList();
    }

    @Get('/:userId', [validateParams(userByIdSchema)])
    public userById(req: RequestX): Promise<ResponseX> {
        return this.userCore.getUserById(req.parameters as userIdParams);
    }
}

export default UserController;
