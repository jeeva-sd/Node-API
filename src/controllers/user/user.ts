import { ApiResult, Controller, GET, RequestX } from 'helpers';
import { validateParams } from 'middlewares';
import { UserCore } from 'core/user';
import { userByIdSchema, userIdParams } from './schema';

@Controller('/user')
class UserController extends UserCore {

    constructor() {
        super();
    }

    @GET('/list')
    public userList(): Promise<ApiResult> {
        return this.getUserList();
    }

    @GET('/:userId', [validateParams(userByIdSchema)])
    public userById(req: RequestX): Promise<ApiResult> {
        return this.getUserById(req.parameters as userIdParams);
    }
}

export default UserController;