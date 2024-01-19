import { DbException, DbResult } from 'utils';
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

    @DbException()
    public async getPostList(): Promise<DbResult> {
        const postList = await db.post.findMany();
        return postList;
    }

    @DbException()
    public async getPostById(postId: number): Promise<DbResult> {
        const postList = await db.post.findUnique({
            where: { id: postId }
        });

        return postList;
    }

    @DbException()
    public async createPost(postData: PostParams): Promise<DbResult> {
        const newPost = await db.post.create({
            data: postData
        });

        return newPost;
    }
}

export { PostRepository };
