var sanitizeHtml = require('sanitize-html');

module.exports = {
    HTML: function (title, list, body, link) {
        return `
        <!DOCTYPE html>
            <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>WEB1- ${sanitizeHtml(title)}</title>
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <p><a href="/author">AUTHOR</a></p>
        ${list}
        <p>${link}</p>
        <h2>${title}</h2>
        <p>${body}</p>
        </body>
        </html>
        `
    }, List: function (topics) {
        var list = '<ul>';
        var i = 0;
        while (i < topics.length) {
            list += `<li><a href="/?id=${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
            i++;
        }
        list += '</ul>';
        return list;
    }, authorSelect(authors, TopicAuthor_id) {
        var authorList;
        var i = 0;
        authorList = '<select name="author_id">'
        while (i < authors.length) {
            var authorSelected = '';
            if (authors[i].id === TopicAuthor_id) { authorSelected = 'selected' };
            authorList += `<option value="${authors[i].id}" ${authorSelected}>${sanitizeHtml(authors[i].name)}</option>`;
            i++;
        }
        authorList += '</select>'
        return authorList;
    }, authorTable(authors) {
        var i = 0;
        var authorTable = `
        <a href="/author">CREATE</a>
        <table border="1">
        <tr>
        <td>No</td>
        <td>name</td>
        <td>profile</td>
        <td></td>
        <td></td>
        </tr>`;
        while (i < authors.length) {
            authorTable += `
            <tr>
            <td>${authors[i].id}</td>
            <td>${sanitizeHtml(authors[i].name)}</td>
            <td>${sanitizeHtml(authors[i].profile)}</td>
            <td><a href="/author/update?id=${authors[i].id}">UPDATE</a></td>
            <td>
                <form action="/author/delete_process" method="post">
                <input name="id" type="hidden" value="${authors[i].id}">
                <input type="submit" value="delete">
                </form>
            </td>
            </tr>`
            i++;
        }
        authorTable += '<table>';

        return authorTable;
    }
}

