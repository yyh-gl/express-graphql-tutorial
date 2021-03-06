var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schemaを設定
var schema = buildSchema(`
 type Query {
 course(id: Int!): Course
 courses(topic: String): [Course]
 },
 type Course {
 id: Int
 title: String
 author: String
 description: String
 topic: String
 url: String
 }
`);

// テストデータ
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
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

// 指定トピックに一致するコースを全て取得
var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => {
            return course.topic === topic
        });
    } else {
        return coursesData;
    }
};

// Root resolverを設定
var root = {
    course: getCourse,
    courses: getCourses
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