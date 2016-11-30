import express from 'express';
import { apolloServer } from 'apollo-server';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';
import cors from 'cors';
import { createServer } from 'http';
// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscriptionManager } from './subscriptions';

const GRAPHQL_PORT = 8080;
const WS_PORT = 3010;

const graphQLServer = express();

graphQLServer.use(cors());

graphQLServer.use('/graphql', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  resolvers: Resolvers,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));

const websocketServer = createServer((request, response) => {
  response.writeHead(200);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

new SubscriptionServer(
  {
    subscriptionManager,

    // the obSubscribe function is called for every new subscription
    // and we use it to set the GraphQL context for this subscription
    onSubscribe: (msg, params) => {
      console.log(msg);
      return Object.assign({}, params, {
        context: {
          author: 'test',
        },
      });
    },
  },
  websocketServer
);
