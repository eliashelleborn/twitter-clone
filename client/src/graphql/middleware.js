import { ApolloLink } from 'apollo-link';

export const middlewareLink = new ApolloLink((operation, forward) => {
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

export const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { response: { headers } } = operation.getContext();

    if (response.data.login) {
      localStorage.setItem('accessToken', response.data.login.accessToken);
      localStorage.setItem('refreshToken', response.data.login.refreshToken);
    }


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
