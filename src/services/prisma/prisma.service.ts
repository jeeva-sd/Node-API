import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { exeLog } from '@/utils';

class PrismaService {
    private static instance: PrismaService;
    private prisma: PrismaClient;

    private constructor(prismaConfig?:
        Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions>) {
        this.prisma = new PrismaClient(prismaConfig);
    }

    public static getInstance(prismaConfig?: PrismaClientOptions): PrismaService {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService(prismaConfig);
        }
        return PrismaService.instance;
    }

    public getPrisma(): PrismaClient {
        return this.prisma;
    }

    public async kill(): Promise<void> {
        try {
            await this.prisma.$disconnect();
        } catch (error) {
            exeLog(error);
        }
    }
}

export { PrismaService };