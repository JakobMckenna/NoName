import { object, string } from 'yup';

export const notesValidation = object({
    sprint:string().required("sprint is required"),
    title: string().min(4, "Title name must atleast be 4 characters").required("name is required"),
    details:string().max(80,"use no more than 80 characters in details").required("details is required"),
    url:string().transform((value) => (value ? value.trim() : value)).matches(/^(https?:\/\/[\w\.-]+\.\w{2,})(\/\S*)?$/, "Invalid URL")
.required("url is required"),

}).required()