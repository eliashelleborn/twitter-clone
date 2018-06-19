import { ApolloClient } from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({ uri: 'http://localhost:3030/graphql' });

const middlewareLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken || accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'x-token': localStorage.getItem('accessToken'),
        'x-refresh-token': localStorage.getItem('refreshToken'),
      },
    }));
  }
  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const { response: { headers } } = operation.getContext();
  if (headers) {
    const accessToken = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  return response;
}));

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([
    middlewareLink,
    afterwareLink,
    httpLink,
  ]),
  cache,
});

export default client;
