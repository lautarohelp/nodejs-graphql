const { ApolloServer } = require("@apollo/server");
const { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } = require('@apollo/server/plugin/landingPage/default')
const { expressMiddleware  } = require('@apollo/server/express4');
const { loadFiles } = require("@graphql-tools/load-files");
const resolvers = require('./resolvers');
const { config } = require('../config/config');
const { buildContext } = require("graphql-passport");
const {typeDefs: scalarsTypeDefs, resolvers: scalarsResolvers} = require("graphql-scalars");


const useGraphql = async (app) => {
  const typeDefs = [
    await loadFiles('./src/**/*.graphql'),
    scalarsTypeDefs
  ];
  const allResolvers = [
    resolvers,
    scalarsResolvers
  ];
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    // context:({req,res})=> buildContext({req,res}),
    playground: true,
    plugins: [
      !config.dev
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: 'superapp@apollo',
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),

    ]
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );
}

module.exports = useGraphql;
