import { PrismaClient } from '@prisma/client';

class PrismaService {
    private static instance: PrismaService;
    private prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    // Singleton pattern to ensure only one instance is created
    public static getInstance(): PrismaService {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService();
        }
        return PrismaService.instance;
    }

    public getPrisma(): PrismaClient {
        return this.prisma;
    }
}

export default PrismaService;