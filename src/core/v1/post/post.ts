import { dbError, Exception, ResponseX, DbResult, dataList, take } from 'helpers';
import { PostParams, postIdParams } from 'controllers/v1/post';
import { PostRepository } from './repository';

class PostCore {
    private postRepository;

    constructor() {
        this.postRepository = PostRepository.getInstance();
    }

    @Exception()
    public async getPostList(): Promise<ResponseX> {
        const userList: DbResult = await this.postRepository.getPostList();
        if (!userList.success) return dbError(userList);

        return dataList(userList.data);
    }

    @Exception()
    public async getPostById(params: postIdParams): Promise<ResponseX> {
        const postResult: DbResult = await this.postRepository.getPostById(params.postId);
        if (!postResult.success) return dbError(postResult);

        return dataList(postResult.data);
    }

    @Exception()
    public async createPost(params: PostParams): Promise<ResponseX> {
        const postResult: DbResult = await this.postRepository.createPost(params);
        if (!postResult.success) return dbError(postResult);

        return take(201, postResult.data);
    }
}

export { PostCore };