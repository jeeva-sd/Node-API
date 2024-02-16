import { ResponseX, Controller, Get, RequestX, Sanitize } from '@/utils';
import { userByIdSchema } from '~/entities';
import { basicAuth } from '~/middlewares';
import { UserCore } from '~/core';

@Controller('/user', [basicAuth])
class UserController {
    private core: UserCore;

    @Get('/')
    public userList(req: RequestX): Promise<ResponseX> {
        return this.userCore().list(req.parameters);
    }

    @Get('/:userId')
    @Sanitize(userByIdSchema)
    public userById(req: RequestX): Promise<ResponseX> {
        return this.userCore().getUserById(req.parameters.userId);
    }

    private userCore(): UserCore {
        if (!this.core) this.core = new UserCore();
        return this.core;
    }
}

export { UserController };
