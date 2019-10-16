CREATE TABLE Questions(
    num INTEGER,
    string TEXT,
    hint TEXT,
    PRIMARY KEY (num)
);

INSERT INTO Questions (num, string, hint)
VALUES (
        1,
        "How often do you play tennis?",
        "This question is asking about frequency."
    ), (
        2,
        "Where do you usually eat lunch?",
        "This question is asking about location."
    ), (
        3,
        "How long did you study last night?",
        "This question is asking about time."
);

CREATE TABLE Choices(
    questionNumber INTEGER,
    choiceID TEXT,
    correct TEXT
);

INSERT INTO Choices (
    questionNumber,
    choiceID,
    correct
) VALUES
    (1, "On Tuesday.", "N"),
    (1, "For two hours.", "N"),
    (1, "Almost every day.", "Y"),
    (1, "With John.", "N"),
    (2, "Sandwich.", "N"),
    (2, "With Jane.", "N"),
    (2, "At 12:00.", "N"),
    (2, "In the cafeteria.", "Y"),
    (3, "With Bob.", "N"),
    (3, "In my room.", "N"),
    (3, "English.", "N"),
    (3, "For three hours.", "Y");

SELECT * FROM Questions;
