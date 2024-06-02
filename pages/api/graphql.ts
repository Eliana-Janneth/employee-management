
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import prisma from '@/config/prisma';
import Cors from 'micro-cors';
import { customResolvers } from '@/graphql/custom/resolvers';
import { customTypes } from '@/graphql/custom/types';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { IncomingMessage, ServerResponse } from 'http';


const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
});

interface Context {
  prisma: PrismaClient;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const functionHandler = async (req: MicroRequest, res: ServerResponse<IncomingMessage> ) => {
  const apolloServer = new ApolloServer({
    context: (): Context => ({ prisma }),
    typeDefs: [...customTypes],
    resolvers: [...customResolvers],
    persistedQueries: false, // This disables persisted queries
    cache: 'bounded', // This sets up a bounded cache
    introspection: process.env.NODE_ENV !== 'production',
  });
  const startServer = apolloServer.start();
  await startServer;
  return apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  return functionHandler(req, res);
});