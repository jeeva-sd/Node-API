import { ResponseX, Controller, Get, RequestX } from 'utils';
import { validate } from '~/middlewares';
import { UserCore } from '~/core/user';
import { user_userId } from './validation';

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

    @Get('/:userId', [validate(user_userId)])
    public userById(req: RequestX): Promise<ResponseX> {
        return this.userCore.getUserById(req.parameters);
    }
}

export default UserController;
