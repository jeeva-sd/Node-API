import { ApiResult, Controller, GET, RequestX } from '../../helpers';
import { validateParams } from '../../middleware';
import { userByIdSchema } from './schema';
import { UserCore } from '../../core/user';

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
        return this.getUserById(req.parameters);
    }
}

export default UserController;