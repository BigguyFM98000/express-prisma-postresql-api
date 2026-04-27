import {PrismaClient} from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");  
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1); // Ends our server and notify that it ended due to an error
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();
}

// const prisma = new PrismaClient({ adapter })

export {prisma, connectDB, disconnectDB}