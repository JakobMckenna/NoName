import { PrismaClient } from '@prisma/client'

const UserService = {
    getUser: ()=>{
        return("a user")
    },
    createUser: async ()=>{
        const prisma = new PrismaClient()
        const user = await prisma.user.create({
            data: {
              email: 'elsa@prisma.io',
              name: 'Elsa Prisma',
            },
          })

        return user

    }
}

export default UserService;