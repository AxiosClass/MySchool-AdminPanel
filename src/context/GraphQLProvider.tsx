import { apolloClient } from '@/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

export function GraphQLProvider({ children }: PropsWithChildren) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
