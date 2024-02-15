import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './modules/schema/typeDefs';
import resolvers from './modules/schema/resolvers';
import { db_connection } from './DB/connection';

db_connection()

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function main ()  {
  const { url } =  await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
console.log(`🚀  Server ready at: ${url}`);
}
main()



