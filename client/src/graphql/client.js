import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { afterwareLink, middlewareLink } from './middleware';
import createStateLink from './state';

const httpLink = new HttpLink({ uri: 'http://localhost:3030/graphql' });

const cache = new InMemoryCache();

const stateLink = createStateLink(cache);

const client = new ApolloClient({
  link: from([
    stateLink,
    middlewareLink,
    afterwareLink,
    httpLink,
  ]),
  cache,
});

export default client;
