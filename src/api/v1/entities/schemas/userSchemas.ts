import * as yup from 'yup';

export const userByIdSchema = yup.object({
    userId: yup.string().required(),
});