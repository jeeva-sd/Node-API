import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime/library';

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

    public async closePrisma(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export default PrismaService;