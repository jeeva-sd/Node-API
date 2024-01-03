import { PrismaClientOptions } from "@prisma/client/runtime/library";
import PrismaService from "./prisma/prismaService";
import { appConfig } from "../config";

const customOptions: PrismaClientOptions = {
    log: ['info', 'warn'/*, 'error' , 'query' */],
    errorFormat: 'minimal',
    datasourceUrl: appConfig.dbConnections.DATABASE_URL
};

const dbService = PrismaService.getInstance(customOptions);
export const db = dbService.getPrisma();
