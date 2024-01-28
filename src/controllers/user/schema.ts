import * as yup from 'yup';

export interface userIdParams {
    userId: number;
}

export const userByIdSchema = yup.object({
    userId: yup.number().positive().integer(),
});