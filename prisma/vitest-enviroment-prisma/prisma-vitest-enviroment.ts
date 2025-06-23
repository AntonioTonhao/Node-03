import 'dotenv/config'
import { prisma } from 'lib/prisma'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { env } from 'env'

import type { Environment } from 'vitest/environments'


function generateDatabaseUrl(schema:string){
    if (!env.DATABASE_URL){
        throw new Error('Required enviromente database URL')
    }

    const url = new URL(env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}



export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        
        const schema = randomUUID()
        const databaseURL = generateDatabaseUrl(schema)

        process.env.DATABASE_URL = databaseURL
        
        execSync('npx prisma migrate deploy')


        return {
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                
                await prisma.$disconnect()
            }
        }
         
    }
}