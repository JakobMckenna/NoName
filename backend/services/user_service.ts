
import { createUserPasswordData, getUserPassword } from '../data-access/user_model';

const UserService = {
  getUser: () => {
    return ("a user")
  },
  signIn: async (email: string, password: string) => {
    let result: any = null;
    try {
      const user = await getUserPassword(email, password);
      //if reul
      if(password == user?.userPassword?.password){
        console.log("password correct");
        result = {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
      else if (password != user?.userPassword?.password)
      {
        console.log("password incorrect");
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      return result;
    }
  },
  createUser: async (email: string, name: string, password: string) => {
    let result: any;
    try {
      result = await createUserPasswordData(name, email, password);

    } catch (err: any) {
      console.log(err)
    } finally {
      return result;
    }


  },
}

export default UserService;