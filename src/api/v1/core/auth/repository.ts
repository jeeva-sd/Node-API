import { RepoGuard, RepoResult } from '@/utils';
import { db } from '@/services';
import { LoginParams, LoginRes, RegisterOrgData, RegisterRes, RegisterUserData } from '~/entities';

class AuthRepository {

    @RepoGuard
    public async register(
        user: RegisterUserData,
        orgData: RegisterOrgData
    ): Promise<RepoResult<RegisterRes>> {

        const isUserExists = await db.user.findFirst({
            where: { phone: user.phone }
        });

        if (isUserExists) return { code: 1100 };

        const registeredData = await db.$transaction(async (prisma) => {
            const userData = await prisma.user.create({
                data: {
                    name: user.name,
                    password: user.password,
                    email: user.email,
                    phone: user.phone,
                    roleId: user.roleId
                },
                select: {
                    id: true,
                    name: true,
                    phone: true,
                }
            });

            const organizationData = await prisma.organization.create({
                data: {
                    name: orgData.name,
                    email: orgData.email,
                    phone: orgData.phone,
                    createdBy: userData.id
                },
                select: {
                    id: true,
                    name: true,
                    phone: true,
                }
            });

            await prisma.user.update({
                where: { id: userData.id },
                data: { orgId: organizationData.id },
            });

            return { userData, organizationData };
        });

        return { data: registeredData };
    }

    @RepoGuard
    public async findUser(params: LoginParams): Promise<RepoResult<LoginRes>> {
        const user = await db.user.findFirst({
            where: {
                phone: params.phone,
                statusId: 1
            },
            select: {
                id: true,
                name: true,
                password: true,
                roleId: true,
                statusId: true,
                orgId: true,
                branchId: true
            }
        });

        return { code: user ? null : 1050, data: user };
    }
}

export { AuthRepository };