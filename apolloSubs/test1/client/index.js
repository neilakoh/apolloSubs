import 'babel-polyfill';
import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';
import createApolloClient from './helpers/create-apollo-client';
import addGraphQLSubscriptions from './helpers/subscriptions';

const wsClient = new Client('ws://localhost:3010');

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  },
  transportBatching: true
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100
});

// const client = new ApolloClient({
//   networkInterface: createNetworkInterface('http://localhost:8080/graphql')
// });

render((
  <ApolloProvider client={client}>
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>
), document.getElementById("app"));
