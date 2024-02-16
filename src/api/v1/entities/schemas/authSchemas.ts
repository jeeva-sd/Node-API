import * as yup from 'yup';
import { RegisterParams, LoginParams } from '~/entities';

export const registerSchema: yup.ObjectSchema<RegisterParams> = yup.object({
    name: yup.string().required().max(20, 'Name must be at most 20 characters'),
    password: yup.string().required().length(8),
    phone: yup.string().required().length(10),
    roleId: yup.number().default(2),
    email: yup.string().email('Invalid email'),
    orgName: yup.string().required().max(20, 'Name must be at most 20 characters'),
});

export const loginSchema: yup.ObjectSchema<LoginParams> = yup.object({
    phone: yup.string().required().length(10),
    password: yup.string().required(),
});