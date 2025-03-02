import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws; // Sets up WebSocket connections, which enables Neon to use WebSocket communication.
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString }); // Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const adapter = new PrismaNeon(pool); // Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.

export const prisma = new PrismaClient({ adapter }).$extends({ // Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
