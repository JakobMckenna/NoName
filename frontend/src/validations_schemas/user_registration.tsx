import { object, string, number, date, InferType } from 'yup';


export const registrationValidation = object({
    name: string().required(),
    email: string().email().required(),
    password: string().required()
}

)