import express from 'express';
import graphqlHTTP from 'express-graphql'
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL & Relay modern is cool!!!');
});

class Friend {
  // es6解构语法
  constructor(id, { firstName, lastName, gender, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.language = language;
    this.email = email;
  }
}

// 内存型数据库
const friendDatabase = {};

const global = {
  // 又解构
  getFriend: ({ id }) => {
    return new Friend(id, friendDatabase[id]);
  },
  createFriend: ({ input }) => { 
    // 随后id生成
    let id = require('crypto').randomBytes(10).toString('hex');
    // 按键id，值对象存，关键input里没存id嘛，算了重复存意思不有
    friendDatabase[id] = input
    return new Friend(id, input);
  },
  updateFriend: ({id, input}) => {
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true
}));

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));