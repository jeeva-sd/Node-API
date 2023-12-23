import * as yup from 'yup';

const userById = yup.object({
    userId: yup.number().positive().integer(),
});

export { userById };