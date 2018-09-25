var db=require('./db')
var template=require('./template')

exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        var title = 'WELCOME';
        var description = 'make coding with node.js!!';
        var list = template.List(topics);
        var html = template.HTML(title, list, description,
            `<a href="/create">CREATE</a>`);
        response.writeHead(200);
        response.end(html);
    });
}