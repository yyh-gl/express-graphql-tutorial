var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schemaを設定
var schema = buildSchema(`
 type Query {
 course(id: Int!): Course
 courses: [Course]
 },
 type Course {
 id: Int
 title: String
 }
`);

// テストデータ
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts'
    }
];

// GraphQL schemaで使用する関数を作成
// 指定IDのコースをひとつ取得
var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
};

// Root resolverを設定
var root = {
    course: getCourse,
    courses: coursesData
};

// Expressサーバの初期化とGraphQLのエンドポイントを設定
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// サーバ起動
app.listen(4000, () => console.log('Express GraphQL Server Now Running On http://localhost:4000/graphql'));