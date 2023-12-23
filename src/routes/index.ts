import { attachRouter } from "./attachRouter";
import { appRoutes } from "./routes";

const applicationRoutes = attachRouter(appRoutes);

export { applicationRoutes };