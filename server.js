const express = require('express');
const app = express();
let postVal = 0;

app.use(express.static('static_files'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('quizDB.db');

const questionAndHint = 'SELECT string, hint FROM Questions WHERE num = ';

function questionQuery(rows) {
    const question = rows[0].string;
    const hint = rows[0].hint;
    var arr = [question, hint];
    return arr;
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app
app.post('/postMsg', (req, res) => {
    postVal = req.body.questNum;
    console.log("In post method");
    console.log(postVal);

    (err) => {
        if (err) {
            res.send({message: 'error in app.post(/users)'});
        } else {
            res.send({message: 'successfully run app.post(/users)'});
        }
    }
});

app.get('/questionQuery', (req, res) => {
    db.serialize(() => {
        console.log("In query method");
        console.log(postVal);
        db.all(questionAndHint+(postVal), (err, rows) => {
            res.send(questionQuery(rows));
        });
    })
});

/*app.get('/2', (req, res) => {
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
});*/

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000/');
});
