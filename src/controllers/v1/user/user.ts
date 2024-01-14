import { ResponseX, Controller, GET, RequestX } from 'helpers';
import { validateParams } from 'middlewares';
import { UserCore } from 'core/v1/user';
import { userByIdSchema, userIdParams } from './schema';

@Controller('/user')
class UserController extends UserCore {

    constructor() {
        super();
    }

    @GET('/list')
    public userList(): Promise<ResponseX> {
        return this.getUserList();
    }

    @GET('/:userId', [validateParams(userByIdSchema)])
    public userById(req: RequestX): Promise<ResponseX> {
        return this.getUserById(req.parameters as userIdParams);
    }
}

export default UserController;