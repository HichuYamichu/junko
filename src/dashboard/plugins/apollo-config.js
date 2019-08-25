import gql from 'graphql-tag';

export const typeDefs = gql`
  type Mutation {
    selectChannel(Channel: Channel): Channel
    selectMember(Member: Member): Member
  }

  type Query {
    SelectedChannel: Channel
    SelectedMember: Member
  }
`;

export const defaults = {
  SelectedChannel: null,
  SelectedMember: null
};

export const resolvers = {
  Mutation: {
    selectChannel: (_, { Channel }, { cache }) => {
      const data = { SelectedChannel: Channel };
      cache.writeData({ data });
      return null;
    },
    selectMember: (_, { Member }, { cache }) => {
      const data = { SelectedMember: Member };
      cache.writeData({ data });
      return null;
    }
  }
};

export default function(context) {
  let httpEndpoint = process.env.API_SERVER_SIDE || 'http://localhost:4000/gql';

  if (process.client) {
    httpEndpoint = process.env.API_CLIENT_SIDE || 'http://localhost:4000/gql';
  }
  return {
    httpEndpoint,
    typeDefs,
    resolvers,
    defaults
  };
}
