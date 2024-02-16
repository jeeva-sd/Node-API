import { Response } from 'express';
import { ResponseX, Controller, RequestX, Post, CustomResponse, Sanitize } from '@/utils';
import { loginSchema, registerSchema } from '~/entities';
import { AuthCore } from '~/core';

@Controller('/auth')
class AuthController {
    private core: AuthCore;

    @Post('/register')
    @Sanitize(registerSchema)
    public register(req: RequestX): Promise<ResponseX> {
        return this.authCore().register(req.parameters);
    }

    @Post('/login')
    @Sanitize(loginSchema)
    @CustomResponse
    public authLogin(req: RequestX, res: Response): Promise<ResponseX | Response> {
        return this.authCore().loginUser(req.parameters, res);
    }

    @Post('/logout')
    @CustomResponse
    public logOutUser(req: RequestX, res: Response): Promise<ResponseX | Response> {
        return this.authCore().logOutUser(req, res);
    }

    private authCore(): AuthCore {
        if (!this.core) this.core = new AuthCore();
        return this.core;
    }
}

export { AuthController };