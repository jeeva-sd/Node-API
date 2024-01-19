import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { extractErrorMessage } from 'utils';

class PrismaService {
    private static instanceOne: PrismaService;
    private prisma: PrismaClient;

    private constructor(prismaConfig: any) {
        this.prisma = new PrismaClient(prismaConfig);
    }

    public static getInstanceOne(prismaConfig?: PrismaClientOptions): PrismaService {
        if (!PrismaService.instanceOne) {
            PrismaService.instanceOne = new PrismaService(prismaConfig);
        }
        return PrismaService.instanceOne;
    }

    public getPrisma(): PrismaClient {
        return this.prisma;
    }

    public async kill(): Promise<void> {
        try {
            await this.prisma.$disconnect();
        } catch (error) {
            console.log(extractErrorMessage(error));
        }
    }
}

export default PrismaService;