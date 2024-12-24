/* eslint-disable no-var */
// Importing the PrismaClient from the Prisma package to interact with the database
import { PrismaClient } from "@prisma/client";

// Creating a function that returns a new instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient(); // This creates a new PrismaClient instance
};

// Declaring a global type for the prisma variable
// This allows us to use prisma globally without TypeScript complaining
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Here, we are checking if a global prisma instance already exists
// If it doesn't exist, we create a new one using the prismaClientSingleton function
const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prisma ?? prismaClientSingleton();

// Exporting the prisma instance to be used throughout the application
export default prisma;

// In a development environment (non-production), we attach the prisma instance to globalThis
// This helps in reusing the same instance during hot-reloading, preventing new instances on each reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
