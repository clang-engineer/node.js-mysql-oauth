var db = require('./db.js')
var template = require('./template.js')
var qs = require('querystring');


exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error, authors) {
            list = template.List(topics);
            authorTable = template.authorTable(authors);
            authorTable += `
            <form action="/author/create_process" method="post">
            <p><input type="text" name="name" placeholder="name"></p>
            <p><textarea name="profile" placeholder="profile"></textarea></p>
            <p><input type="submit"></p>
            </form>
            `;
            html = template.HTML('AUTHOR', list, authorTable, '');
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`INSERT INTO author (name, profile) VALUES(?,?)`, [post.name, post.profile],
            function (error, result) {
                if (error) { throw error };
                response.writeHead(302, { Location: `/author?id=${result.insertId}` });
                response.end();
            }
        )
    });
}