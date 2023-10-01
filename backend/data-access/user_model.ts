
import { PrismaClient } from '@prisma/client'


export async function createUserPasswordData(name:string , email:string , password: string) {
    let result:boolean = false;
    try {
        const prisma = new PrismaClient()
        const user = await prisma.user.create(
            {
                data: {
                    email: email,
                    name: name,
                    userPassword:{
                        create:{
                            password:password
                        }
                    }
                },
            }
        );
        console.log(user)
     //   result = true;
       // user.success= true
        return user;
    } catch (err:any) {
      console.log(err)
      return null;
    }finally {
       // return result;
    }
}


export function getUserData(email:string) {
    
}