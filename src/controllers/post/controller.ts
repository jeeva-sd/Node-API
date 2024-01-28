import { ResponseX, Controller, Get, RequestX, Post } from 'utils';
import { validateParams } from '~/middlewares';
import { PostCore } from '~/core/post';
import { PostParams, postByIdSchema, postIdParams, postSchema } from './validation';

@Controller('/post')
class PostController {
    private postCore: PostCore;

    constructor() {
        this.postCore = new PostCore();
    }

    @Get('/list')
    public postList(): Promise<ResponseX> {
        return this.postCore.getPostList();
    }

    @Get('/:postId', [validateParams(postByIdSchema)])
    public postById(req: RequestX): Promise<ResponseX> {
        return this.postCore.getPostById(req.parameters as postIdParams);
    }

    @Post('/', [validateParams(postSchema)])
    public newPost(req: RequestX): Promise<ResponseX> {
        return this.postCore.createPost(req.parameters as PostParams);
    }
}

export default PostController;