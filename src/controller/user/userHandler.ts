import * as yup from 'yup';

const userList = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer(),
});

export { userList };