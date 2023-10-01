
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
        result = true;
       
    } catch (err:any) {
      console.log(err)
    }finally {
        return result;
    }
}


export function getUserData(email:string) {
    
}