import PrismaService from "./prisma/prismaService";

const dbService = PrismaService.getInstance();
export const db = dbService.getPrisma();
