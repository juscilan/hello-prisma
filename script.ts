import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(email: string) {
    // const user = await prisma.user.create({
    //   data: {
    //     name: 'Alice',
    //     email: 'alice3@prisma.io',
    //   },
    // })
    // console.log(user)

    const user = await prisma.user.create({
      data: {
        name: `Testing name - ${email}`,
        email,
        posts: {
            create: {
            title: 'Hello World 2',
            },
          },
        },
      })

    // console.log(user)

    // const users = await prisma.user.findMany()
    // console.log(users)

    const usersWithPosts = await prisma.user.findMany({
      include: {
        posts: true,
      },
    })
    console.dir(usersWithPosts, { depth: null })
}

main("spongebob2@gmail.com")
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })