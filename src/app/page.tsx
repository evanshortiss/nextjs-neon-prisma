import { db } from "@/db";

export const dynamic = 'force-dynamic'

async function getUsers() {
  return Promise.all([
    db.user.findMany(),
    db.post.count()
  ])
}

export default async function Home() {
  const [users, posts] = await getUsers();

  const userEls = users.map((user) => {
    return (
      <li key={user.id}>
        <p>({user.name}) {user.email}</p>
      </li>
    )
  })
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>Post count: {posts}</p>
      <hr />
      <ul>
        {userEls}
      </ul>
    </main>
  );
}
