import { repoError, CoreGuard, ResponseX, RepoResult, dataList, take } from 'utils';
import { INewPost, IPostId } from '~/controllers/post';
import { PostRepository } from './repository';

class PostCore {
    private postRepository;

    constructor() {
        this.postRepository = PostRepository.getInstance();
    }

    @CoreGuard
    public async getPostList(): Promise<ResponseX> {
        const userList: RepoResult = await this.postRepository.getPostList();
        if (!userList.success) return repoError(userList);

        return dataList(userList.data);
    }

    @CoreGuard
    public async getPostById(params: IPostId): Promise<ResponseX> {
        const postResult: RepoResult = await this.postRepository.getPostById(params.postId);
        if (!postResult.success) return repoError(postResult);

        return dataList(postResult.data);
    }

    @CoreGuard
    public async createPost(params: INewPost): Promise<ResponseX> {
        const postResult: RepoResult = await this.postRepository.createPost(params);
        if (!postResult.success) return repoError(postResult);

        return take(201, postResult.data);
    }
}

export { PostCore };