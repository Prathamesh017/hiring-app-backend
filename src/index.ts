import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import application from "./application";
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()


const server = new ApolloServer({
  gateway: {
    async load() {
      return { executor: application.createApolloExecutor() };
    },
    onSchemaLoadOrUpdate(callback) {
      callback({ apiSchema: application.schema } as any);
      return () => { };
    },
    async stop() { },
  },
});



const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    const token = req.headers.authorization || '';
    return {
      token,
    };
  }
});

console.log(`
  🚀  Server is running!
  📭  Query at ${url}
`);
