import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { appConfig } from '~/config';
import PrismaService from './prisma/prismaService';

const customOptions: PrismaClientOptions = {
    log: ['info', 'warn'/*, 'error' , 'query' */],
    errorFormat: 'minimal',
    datasourceUrl: appConfig.database.url
};

const dbService = PrismaService.getInstance(customOptions);
export const db = dbService.getPrisma();
