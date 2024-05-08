import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 60 * 1000,
  connectionTimeoutMillis: 10 * 1000,
})

pool.on('error', (err) => {
  console.error('pg.Pool emitted an error:', err)
})

pool.on('connect', () => {
  console.log(`pg.Pool connected a new client. Total clients: ${pool.totalCount}`)
})

pool.on('remove', () => {
  console.log(`pg.Pool removed a client. Total clients: ${pool.totalCount}`)
})

pool.on('acquire', () => {
  console.log('pg.Pool client was acquired')
});

(pool as any).on('release', (err: any) => {
  if (err) {
    console.log('pg.Pool client was released with error:', err)
  } else {
    console.log('pg.Pool client was released')
  }
});
// https://github.com/brianc/node-pg-pool/issues/116
const adapter = new PrismaNeon(pool)
export const db = new PrismaClient({ adapter })
