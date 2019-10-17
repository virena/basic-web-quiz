const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, 'quizDB.db');

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		}
});

let query = 'SELECT choiceID as id FROM Choices WHERE questionNumber = 1';
//let selectAll = 'SELECT choiceID as id FROM Choices';
let questionId = 1;

db.all(query, [], (err, rows) => {
	if (err) {
		return console.error(err.message);
	}
	rows.forEach((row) => {
		console.log(row.id);
	});
});

db.serialize(() => {
	db.each('SELECT choiceID as id FROM Choices', (err, options) => {
		if (err) {
			console.error(err.message);
		}
		console.log(options.id);
	});
});

db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Close the database connection.');
});
