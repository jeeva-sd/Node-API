import * as yup from 'yup';

export interface postIdParams {
    postId: number;
}

export const postByIdSchema = yup.object({
    postId: yup.number().positive().integer(),
});

export interface PostParams {
    id?: number;
    title: string;
    content: string;
    published: boolean;
    userId: number;
  }

export const postSchema = yup.object({
    id: yup.number().integer(),
    title: yup.string().required(),
    content: yup.string().required(),
    published: yup.boolean().required(),
    userId: yup.number().integer().required(),
});