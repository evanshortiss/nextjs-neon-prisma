import { db } from "@/db";

export const config = {
  runtime: "edge",
};
const start = Date.now();
export async function GET(req: Request) {
  const time = Date.now();
  console.log(new Date(), 'running query')

  const data = await db.post.findMany({ take: 10})

  console.log(new Date(), 'returning response')
  return Response.json(
    {
      data,
      queryDuration: Date.now() - time,
      invocationIsCold: start === time,
      invocationRegion: (req.headers.get("x-vercel-id") ?? "").split(":")[1] || null,
    },
    {
      headers: {
        "x-edge-is-cold": start === time ? "1" : "0",
      },
    }
  );
}
