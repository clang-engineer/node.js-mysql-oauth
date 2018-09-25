var db = require('./db.js')
var template = require('./template.js')


exports.home = function (request, response) {
    db.query('SELECT * FROM topic', function (error, topics) {
        db.query('SELECT * FROM author', function (error, authors) {
            list = template.List(topics);
            authorTable = template.authorTable(authors);
            html = template.HTML('AUTHOR', list, authorTable, '');
            response.writeHead(200);
            response.end(html);
        });
    });
}