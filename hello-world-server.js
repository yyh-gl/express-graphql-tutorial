var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schemaを設定
var schema = buildSchema(`
 type Query {
 message: String
 }
`);

// Root resolverを設定
var root = {
    message: () => 'Hello World!'
};

// Expressサーバの初期化とGraphQLのエンドポイントを設定
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// サーバ起動
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));