import UserController from '~/controllers/v1/user';
import PostController from '~/controllers/v1/post';

export const combineRoutes = [
    UserController,
    PostController
];