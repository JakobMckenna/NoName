import { object, string } from 'yup';

export const projectValidation = object({
    name: string().min(4, "Project name must atleast be 4 characters").required("name is required"),
}).required()