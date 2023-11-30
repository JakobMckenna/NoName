import { date, object, string,ref} from 'yup';

export const sprintValidation =object({
    name:string().required(),
    start:date().required().max(ref("deadline"),"invalid date"),
    deadline:date().required().min(ref("start"),"invalid date")

}).required()