
import { PrismaClient } from '@prisma/client'
import { error } from 'console';


export async function createUserPasswordData(name: string, email: string, password: string) {
    const prisma = new PrismaClient()
    try {

        const user = await prisma.user.create(
            {
                data: {
                    email: email,
                    name: name,
                    userPassword: {
                        create: {
                            password: password
                        }
                    }
                },
            }
        );
        console.log(user)

        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        // clean up prisma client object
        prisma.$disconnect()
    }
}

/*
    getUserPassword
    confirms if an entered password is correct
    @userEmail is a string , @userPassword is a string
    returns deleted user obbject
*/
export async function getUserPassword(userEmail: string) {
    const prisma = new PrismaClient()
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
            include: {
                userPassword: true,
            }
        });
       
    
        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally{
        prisma.$disconnect()
    }
}


/*
    deleteUserByID
    delete user by userID 
    @userID is a int
    returns deleted user obbject
*/
export async function deleteUserByID(userID: number) {
    const prisma = new PrismaClient();
    try {
        
        const user = await prisma.user.delete({
            where:{
                id:userID
            }
        })

        console.log(`Deleted user\n${user}`)
       if(user!=null)
       {
        console.log("user doesnt exist")
        throw new Error ("user does not exist")
       }
        return user;
    } catch (err: any) {
        console.log(err)
        //throw(error)
      //  throw new Error ()
        return null;
    } finally{
        prisma.$disconnect()
    }
    
}
