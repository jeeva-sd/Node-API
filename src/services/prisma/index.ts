import { PrismaClientOptions } from '@prisma/client/runtime/library';
import { appConfig } from '~/config';
import PrismaService from './prismaService';

const parkingDBOptions: PrismaClientOptions = {
    log: ['info', 'warn'/*, 'error' , 'query' */],
    errorFormat: 'minimal',
    datasourceUrl: appConfig.database.url
};

export const dbService = PrismaService.getInstanceOne(parkingDBOptions);
export const parkingDB = dbService.getPrisma();