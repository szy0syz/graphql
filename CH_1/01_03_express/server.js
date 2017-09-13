import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL & Relay modern is cool!!!');
});

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));