import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './data/schema';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    views: (options, args) => ({
      views: 'Tezt',
    }),
  },
});
export { subscriptionManager, pubsub };
