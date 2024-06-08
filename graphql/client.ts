import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';

declare global {
  var apolloGlobal: ApolloClient<object>;
}

/*
    Configuración del cliente de Apollo para realizar consultas a la API de GraphQL.
*/
let client: ApolloClient<object>;

if (process.env.NODE_ENV === 'production') {
  client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: from([
      new HttpLink({
        // eslint-disable-next-line no-nested-ternary
        uri: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/graphql` : 'http://localhost:3000/api/graphql', 
      }),
    ]),
    connectToDevTools: true,
  });
} else {
  if (!global.apolloGlobal) {
    global.apolloGlobal = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        new HttpLink({
          uri: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/api/graphql` : 'http://localhost:3000/api/graphql',
        }),
      ]),
      connectToDevTools: true,
    });
  }
  client = global.apolloGlobal;
}
export { client };