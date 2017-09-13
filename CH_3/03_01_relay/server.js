import express from 'express';
import graphqlHTTP from 'express-graphql'
import path from 'path';
import webpack from 'webpack';
import WebPackDevServer from 'webpack-dev-server';
import { schema } from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;


// GraphQL server
const graphqlServer = express();

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
  updateFriend: ({ id, input }) => {
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

graphqlServer.use('/', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true
}));

graphqlServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL server on localhost:${GRAPHQL_PORT}/`));

// Relay

const compiler = webpack({
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src', 'App.js')],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
    ],
  },
  output: { filename: 'App.js', path: '/' }
});

const app = new WebPackDevServer(compiler, {
  contentBase: '/public/',
  proxy: { 'graphql': `http://localhost:${APP_PORT}` },
  publicPath: '/src/',
  stats: { colors: true },
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => console.log(`App is now server on localhost:${APP_PORT}/`));

