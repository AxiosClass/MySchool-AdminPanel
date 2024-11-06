import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  gql,
} from '@apollo/client';

import { HASURA_ADMIN_SECRET, HASURA_HTTP_URI, HASURA_WS_LINK } from '@/config';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: HASURA_HTTP_URI,
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
  },
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: HASURA_WS_LINK,
          connectionParams: {
            headers: {
              'x-hasura-admin-secret': HASURA_ADMIN_SECRET!,
            },
          },
        }),
      )
    : null;

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      )
    : httpLink;

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export { apolloClient, gql };
