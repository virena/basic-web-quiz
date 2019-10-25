const express = require('express');
const app = express();
let postVal = 0;

app.use(express.static('static_files'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('quizDB.db');

// Queries
const hint = 'SELECT hint FROM Questions WHERE num = ';
const answer = 'SELECT choiceID FROM Choices WHERE correct = "Y" AND questionNumber = ';

const questionOptionsQuery = `
SELECT
    Questions.string,
    Choices.choiceID
FROM
    Questions
    LEFT JOIN Choices ON(Questions.num = Choices.questionNumber)
WHERE Questions.num = `;

const count = 'SELECT COUNT(*) FROM Questions';

// POST
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app

app.post('/postMsg', (req, res) => {
    postVal = req.body.questNum;
});

// Questions and choices
app.get('/questionOptions', (req, res) => {
    db.all(questionOptionsQuery+postVal, (err, rows) => {
        res.send(rows);
    });
});

app.get('/numQuestions', (req, res) => {
    db.all(count, (err, rows) => {
        res.send(rows)
    });
});

// Hint
app.get('/hint', (req, res) => {
    db.all(hint+postVal, (err, rows) => {
        res.send(rows)
    });
});

// Submit
app.get('/submit', (req, res) => {
    db.all(answer+postVal, (err, rows) => {
        res.send(rows)
    });
});

app.listen(3000, () => {});
