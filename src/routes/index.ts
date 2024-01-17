import { attachRouter } from 'utils';
import { combineRoutes } from './routes';

const applicationRoutes = attachRouter(combineRoutes);

export { applicationRoutes };