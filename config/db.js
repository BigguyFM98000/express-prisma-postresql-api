import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"], 
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");
    } catch (error) {
        console.error(`Database connection error: ${error}`);
        process.exit(1); // tell node.js that db connection ended due to an error
    }
}

const disconnectDB = () => {
    await prisma.$disconnect();
}

export {prisma, connectDB, disconnectDB}