import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { repoError, CoreGuard, ResponseX, take } from '@/utils';
import { LoginParams, RegisterParams, TokenData } from '~/entities';
import { appConfig } from '@/config';
import { AuthRepository } from './repository';

class AuthCore {
    private authRepository: AuthRepository;

    @CoreGuard
    public async loginUser(params: LoginParams, res: Response): Promise<Response | ResponseX> {
        const user = await this.repoInstance().findUser(params);
        if (!user.success) return res.status(400).send(repoError(user));

        const passwordMatch = await bcrypt.compare(params.password, user.data.password);
        if (passwordMatch) {
            const tokenData: TokenData = {
                userId: user.data.id,
                roleId: user.data.roleId,
                orgId: user.data.orgId,
                branchId: user.data.branchId
            };

            const response = {
                name: user.data.name,
                userId: user.data.id,
                roleId: user.data.roleId,
                branchId: user.data.branchId
            };

            const cookieOptions = {
                httpOnly: appConfig.cookie.httpOnly,
                secure: appConfig.cookie.secure,
                expire: appConfig.cookie.expire,
                sameSite: appConfig.cookie.sameSite,
            };

            const token = jwt.sign(tokenData, appConfig.jwt.accessSecretKey, {
                expiresIn: '1w'
            });

            res.cookie('x-key', token, cookieOptions);
            return res.send(take(1051, response));
        }

        return res.status(400).send(take(1050));
    }

    @CoreGuard
    public async register(params: RegisterParams): Promise<ResponseX> {
        const { name, password, phone, email, orgName, roleId } = params;

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            phone,
            email,
            roleId,
            password: hashedPassword
        };

        const orgData = {
            name: orgName,
            phone,
            email,
        };

        const result = await this.repoInstance().register(userData, orgData);
        if (!result.success) return repoError(result);
        return take(200, result.data.userData);
    }

    @CoreGuard
    public async logOutUser(_req: Request, res: Response): Promise<Response | ResponseX> {
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 7, // 1 week
        };

        res.clearCookie('x-key', cookieOptions);
        return res.status(200).send(take(1052));
    }

    private repoInstance(): AuthRepository {
        if (!this.authRepository) this.authRepository = new AuthRepository();
        return this.authRepository;
    }
}

export { AuthCore };