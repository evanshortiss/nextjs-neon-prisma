import { db } from "@/db";
import Image from "next/image";
import { use } from "react";

async function getUsers() {
  return db.user.findMany();
}

export default async function Home() {
  const users = await getUsers();

  const userEls = users.map((user) => {
    return (
      <li key={user.id}>
        <p>({user.name}) {user.email}</p>
      </li>
    )
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {userEls}
      </ul>
    </main>
  );
}
