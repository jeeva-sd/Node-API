import { ResponseX, Controller, Get, RequestX, Post } from 'utils';
import { validate } from '~/middlewares';
import { PostCore } from '~/core/post';
import { INewPost, postByIdSchema, IPostId, postSchema } from './validation';

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

    @Get('/:postId', [validate(postByIdSchema)])
    public postById(req: RequestX): Promise<ResponseX> {
        return this.postCore.getPostById(req.parameters as IPostId);
    }

    @Post('/', [validate(postSchema)])
    public newPost(req: RequestX): Promise<ResponseX> {
        return this.postCore.createPost(req.parameters as INewPost);
    }
}

export default PostController;