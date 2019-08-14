const gql = require('graphql');

const fieldParser = query => {
  const parsed = gql.parse(query);
  const fields = parsed.definitions[0].selectionSet.selections[0].selectionSet.selections;
  return fields;
};

module.exports = fieldParser;
