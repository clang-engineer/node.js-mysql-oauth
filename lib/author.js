var db = require('./db.js')
var template = require('./template.js')
var qs = require('querystring');
var url = require('url');


exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error, authors) {
            list = template.List(topics);
            authorTable = template.authorTable(authors);
            authorTable += `
            <form action="/author/create_process" method="post">
            <p><input type="text" name="name" placeholder="name"></p>
            <p><textarea name="profile" placeholder="profile"></textarea></p>
            <p><input type="submit" value="CREATE"></p>
            </form>
            `;
            html = template.HTML(`AUTHOR`, list, authorTable, '');
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

exports.update = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error, authors) {
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            db.query('SELECT * FROM author WHERE id=?', [queryData.id], function (error, author) {
                list = template.List(topics);
                authorTable = template.authorTable(authors);
                authorTable += `
            <form action="/author/update_process" method="post">
            <p><input type="hidden" name="id" value="${author[0].id}"></p>
            <p><input type="text" name="name" placeholder="name" value="${author[0].name}"></p>
            <p><textarea name="profile" placeholder="profile">${author[0].profile}</textarea></p>
            <p><input type="submit" value="UPDATE"></p>
            </form>
            `;
                html = template.HTML('AUTHOR', list, authorTable, '');
                response.writeHead(200);
                response.end(html);
            });
        });
    });
}

exports.update_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query('UPDATE author SET name=?, profile=? WHERE id=?', [post.name, post.profile, post.id], function (error, result) {
            if (error) { throw error };
            response.writeHead(302, { Location: `/author/update?id=${post.id}` });
            response.end();
        });
    });
}

exports.delete_process = function (request, response) {
    var body = "";
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query('DELETE FROM author WHERE id=?', [post.id], function (error, result) {
            if (error) { throw error };
            response.writeHead(302, { Location: '/author' });
            response.end();
        });
    });
}