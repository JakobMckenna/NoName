import { date, object, string,ref} from 'yup';

export const sprintValidation =object({
    name:string().required().min(4,"Please give sprint a meaningful name"),
    start:date().required().max(ref("deadline"),"start date must be before deadline "),
    deadline:date().required().min(ref("start"),"deadline must be after start date")

}).required()