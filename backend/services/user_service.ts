
import { createUserPasswordData } from '../data-access/user_model';

const UserService = {
    getUser: () => {
        return ("a user")
    },
    createUser: async (email:string , name:string ,password: string) => {
        let result:boolean = false;
        try {
          result = await createUserPasswordData(name,email,password);
           
        } catch (err:any) {
          console.log(err)
        }finally {
            return result;
        }
        

    }
}

export default UserService;