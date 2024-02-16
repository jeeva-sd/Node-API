import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { PrismaService } from './prisma.service';
import { appConfig } from '@/config';

const dbOptions: PrismaClientOptions = {
    log: ['info', 'warn'/*, 'error' , 'query' */],
    errorFormat: 'minimal',
    datasourceUrl: appConfig.database.url
};

export const dbService = PrismaService.getInstance(dbOptions);
export const db = dbService.getPrisma();