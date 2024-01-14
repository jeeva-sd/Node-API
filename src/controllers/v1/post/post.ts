import { ResponseX, Controller, GET, RequestX, POST } from 'helpers';
import { validateParams } from 'middlewares';
import { PostCore } from 'core/v1/post';
import { PostParams, postByIdSchema, postIdParams, postSchema } from './schema';

@Controller('/post')
class PostController extends PostCore {

    constructor() {
        super();
    }

    @GET('/list')
    public postList(): Promise<ResponseX> {
        return this.getPostList();
    }

    @GET('/:postId', [validateParams(postByIdSchema)])
    public postById(req: RequestX): Promise<ResponseX> {
        return this.getPostById(req.parameters as postIdParams);
    }

    @POST('/', [validateParams(postSchema)])
    public newPost(req: RequestX): Promise<ResponseX> {
        return this.createPost(req.parameters as PostParams);
    }
}

export default PostController;