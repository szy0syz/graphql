import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
    IDTyped: String
  }

  type Query {
    friend (id: ID!): Friend
  }
`);

export default schema;