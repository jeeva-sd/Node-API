import { attachRouter } from 'helpers';
import { combineRoutes } from './routes';

const applicationRoutes: any = attachRouter(combineRoutes);

export { applicationRoutes };