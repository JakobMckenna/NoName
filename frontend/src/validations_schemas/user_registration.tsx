import { object, string} from 'yup';


export const registrationValidation = object({
    name: string().required("name is required"),
    email: string().email("emai not valid").required("email is required"),
    password: string().required("password is required")
}

).required()