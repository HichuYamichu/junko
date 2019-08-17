import gql from 'graphql-tag';

export const typeDefs = gql`
  type Mutation {
    selectChannel(Channel: Channel): Channel
  }

  type Query {
    SelectedChannel: Channel
  }
`;

export const defaults = {
  SelectedChannel: null
};

export const resolvers = {
  Mutation: {
    selectChannel: (_, { Channel }, { cache }) => {
      const data = { SelectedChannel: Channel };
      cache.writeData({ data });
      return null;
    }
  }
};

export default function() {
  return {
    httpEndpoint: 'http://localhost:3000/gql',
    typeDefs,
    resolvers,
    defaults
  };
}
