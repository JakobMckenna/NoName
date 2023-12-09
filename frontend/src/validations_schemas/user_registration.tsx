/* eslint-disable */
import { object, string} from 'yup';


export const registrationValidation = object({
    name: string().min(3, "Name must atleast be 3 characters").required("name is required"),
    email: string().min(6, "Email must be atleast 6 characters").email("email not valid").required("email is required"),
    password: string().min(6, "Password must be atleast 6 characters").required("password is required")
}

).required()