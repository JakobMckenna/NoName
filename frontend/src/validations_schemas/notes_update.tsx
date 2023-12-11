/* eslint-disable */
import { object, string } from 'yup';

export const notesValidation = object({
    sprint:string(),
    title: string().min(4, "Title name must atleast be 4 characters"),
    details:string().max(80,"use no more than 80 characters in details"),
    url:string().transform((value) => (value ? value.trim() : value)).matches(/^(https?:\/\/[\w.-]+\.\w{2,})(\/\S*)?$/, "Invalid URL"),

}).required()