import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';

class PrismaService {
    private static instance: PrismaService;
    private prisma: PrismaClient;

    private constructor(prismaConfig: any) {
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

    public async closePrisma(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export default PrismaService;