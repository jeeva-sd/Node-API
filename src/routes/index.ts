import { attachRouter } from '../helpers';
import { combineRoutes } from './routes';

const applicationRoutes = attachRouter(combineRoutes);

export { applicationRoutes };