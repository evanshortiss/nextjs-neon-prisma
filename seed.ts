import { db, pool } from "@/db";

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

async function main () {
  await db.post.deleteMany({
    where: {}
  })
  await db.user.deleteMany({
    where: {}
  })
  
  await db.user.create({
    data: {
      email: 'foo@bar.com',
      name: 'Foo',
      posts: {
        create: {
          title: 'Hello, World! It is me, Foo!',
          content: 'This is my first post, a s Foo.'
        }
      }
    }
  })

  await db.user.create({
    data: {
      email: 'bar@foo.com',
      name: 'Bar',
      posts: {
        create: {
          title: 'Hello, World! It is me, Bar!',
          content: 'This is my first post, a s Bar.'
        }
      }
    }
  })

  // Note: this doesn't work with the custom adapter
  // await db.$disconnect()
  await pool.end()
  console.log('Seed complete!')
}
