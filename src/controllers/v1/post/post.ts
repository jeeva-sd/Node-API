import { ResponseX, Controller, GET, RequestX, POST } from 'helpers';
import { validateParams } from 'middlewares';
import { PostCore } from 'core/v1/post';
import { PostParams, postByIdSchema, postIdParams, postSchema } from './schema';

@Controller('/post')
class PostController {
    private postCore: PostCore;

    constructor() {
        this.postCore = new PostCore();
    }

    @GET('/list')
    public postList(): Promise<ResponseX> {
        return this.postCore.getPostList();
    }

    @GET('/:postId', [validateParams(postByIdSchema)])
    public postById(req: RequestX): Promise<ResponseX> {
        return this.postCore.getPostById(req.parameters as postIdParams);
    }

    @POST('/', [validateParams(postSchema)])
    public newPost(req: RequestX): Promise<ResponseX> {
        return this.postCore.createPost(req.parameters as PostParams);
    }
}

export default PostController;