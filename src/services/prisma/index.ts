import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { appConfig } from '~/config';
import PrismaService from './service';

const dbOptions: PrismaClientOptions = {
    log: ['info', 'warn'/*, 'error' , 'query' */],
    errorFormat: 'minimal',
    datasourceUrl: appConfig.database.url
};

export const dbService = PrismaService.getInstanceOne(dbOptions);
export const db = dbService.getPrisma();