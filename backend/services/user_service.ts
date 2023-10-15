
import { error } from 'console';
import { createUserPasswordData, deleteUserByID, getUserPassword } from '../data-access/user_model';
import jwt from "jsonwebtoken";




const createUserToken = (email: string) => {
  return jwt.sign({email}, "TLzr2645ADWJHnVwLILFarysji44YiPi", {
    expiresIn: "24h",
  });
};


const UserService = {
  getUser: () => {
    return ("a user")
  },
  signIn: async (email: string, password: string) => {
    let result: any = null;
    try {
      const user = await getUserPassword(email, password);
      //if reul
      if (password == user?.userPassword?.password) {
        console.log("password correct");
        result = {
          id: user.id,
          email: user.email,
          name: user.name,
          token: createUserToken(user.email)

        }
      }
      else if (password != user?.userPassword?.password) {
        console.log("password incorrect");
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      return result;
    }
  },
  createUser: async (email: string, name: string, password: string) => {
    let result: any = null;
    try {
      const user = await createUserPasswordData(name, email, password);
      if (user) {
        result = {
          id: user?.id,
          email: user?.email,
          token: createUserToken(user?.email)
        }
      }
    } catch (err: any) {
      console.log(err)
    } finally {
      return result;
    }
  },
  deleteUser:async (userID: number)=>{
    let result: any = null;
    try {

      const deletedUser = await deleteUserByID(userID);
      if (deletedUser) {
        result = deletedUser;
      }
    } catch (err: any) {
      console.log(err)
      throw new Error ()
    } finally {
      return result;
    }
  }
}

export default UserService;