import * as yup from 'yup';

export interface IPostId {
    userId: number;
}

export const user_userId = yup.object({
    userId: yup.number().positive().integer(),
});