const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default')
const { expressMiddleware  } = require('@apollo/server/express4');

const typeDefs = `
  type Query {
    hello: String!
    getPerson(name: String, age:Int): String
    getInit(age: Int): Int
    getFloat(price: Float): String
    getString: String
    getBoolean: Boolean
    getID: ID
    getNumbers(numbers: [Int!]!): [Int]
  }
`;
// Get = Query
// POST, PUT, DELETE = Mutations
// ! = not null

// List
//[string]
// [Int]

const resolvers = {
  Query: {
    hello: () => 'hola mundo',
    getPerson: (_, args) => `Hello, my name is ${args.name}, I'm ${args.age} years old!`,
    getInit: (_, args) => args.age,
    getFloat: (_, args) => `Its price $${args.price}`,
    getString: () => 'Hello world',
    getBoolean: () => true,
    getID: () => '1234567890',
    getNumbers: (_, args) => args.numbers
  }
}

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs,
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
