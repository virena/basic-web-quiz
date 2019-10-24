const express = require('express');
const app = express();

app.use(express.static('static_files'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('quizDB.db');

const questionAndHint = 'SELECT string, hint FROM Questions WHERE num = ';

function questionQuery(rows) {
    const question = rows.map(e => e.string);
    const hint = rows.map(e => e.hint);
    var arr = [question, hint];
    return arr;
}

app.get('/1', (req, res) => {
    db.serialize(() => {
        db.all(questionAndHint+'1', (err, rows) => {
            res.send(questionQuery(rows));
        });
    })
});

app.get('/2', (req, res) => {
    db.serialize(() => {
        db.all(questionAndHint+'2', (err, rows) => {
            res.send(questionQuery(rows));
        });
    })
});

app.get('/3', (req, res) => {
    db.serialize(() => {
        db.all(questionAndHint+'3', (err, rows) => {
            res.send(questionQuery(rows));
        });
    })
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000/');
});
