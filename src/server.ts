import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { db_connection } from './DB/connection';
import dotenv from 'dotenv';dotenv.config()
import { mergedTypeDefs , mergedResolvers } from './schema/graphql';

export const server = new ApolloServer({
  typeDefs :mergedTypeDefs,
  resolvers : mergedResolvers ,
});
async function main() {

  const { url } = await startStandaloneServer(server, {
    context: async ({ req  , res }) => ({req , res })
  });
db_connection()
console.log(`🚀  Server ready at: ${url}`);
}
main()



