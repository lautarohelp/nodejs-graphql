const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')
const { expressMiddleware  } = require('@apollo/server/express4');
const { loadFiles } = require("@graphql-tools/load-files");



const resolvers = {
  Query: {
    hello: () => 'hola mundo',
    getPerson: (_, args) => `Hello, my name is ${args.name}, I'm ${args.age} years old!`,
    getInit: (_, args) => args.age,
    getFloat: (_, args) => `Its price $${args.price}`,
    getString: () => 'Hello world',
    getBoolean: () => true,
    getID: () => '1234567890',
    getNumbers: (_, args) => args.numbers,
    getProduct: () => {
      return {
        id: '1212',
        name: 'Lauatro',
        price: 100.12,
        description: 'bla bla blaaaa',
        image: 'http://image.asas',
        createdAt: new Date().toISOString(),
      }
    }
  }
}

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault
    ]
  });

  await server.start();

  app.use(expressMiddleware(server,{
    context: async ({req}) => ({
      token: req.headers.token
    })
  }))
}

module.exports = useGraphql;
