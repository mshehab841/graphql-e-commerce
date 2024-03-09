import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema/schema.graphql';
import resolvers from './schema/resolvers.graphql';
import { db_connection } from './DB/connection';
import dotenv from 'dotenv';dotenv.config()

db_connection()
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function main() {



  const { url } = await startStandaloneServer(server, {
    context: async ({ req  , res }) => ({req , res })
  });
console.log(`🚀  Server ready at: ${url}`);
}
main()



