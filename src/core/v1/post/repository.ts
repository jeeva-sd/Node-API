import { RepoGuard, RepoResult } from 'utils';
import { db } from '~/database';
import { PostParams } from '~/controllers/v1/post';

class PostRepository {
    private static instance: PostRepository | null = null;

    private constructor() {
        // Private constructor to prevent external instantiation
    }

    public static getInstance(): PostRepository {
        if (!PostRepository.instance) {
            PostRepository.instance = new PostRepository();
        }
        return PostRepository.instance;
    }

    @RepoGuard
    public async getPostList(): Promise<RepoResult> {
        const data = await db.post.findMany();
        return { data };
    }

    @RepoGuard
    public async getPostById(postId: number): Promise<RepoResult> {
        const data = await db.post.findUnique({
            where: { id: postId }
        });

        return { data };
    }

    @RepoGuard
    public async createPost(postData: PostParams): Promise<RepoResult> {
        const data = await db.post.create({
            data: postData
        });

        return { data };
    }
}

export { PostRepository };
