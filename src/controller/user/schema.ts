import * as yup from 'yup';

const userByIdSchema = yup.object({
    userId: yup.number().positive().integer(),
});

export { userByIdSchema };