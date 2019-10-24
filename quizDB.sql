SELECT string, hint FROM Questions WHERE num = 1;
SELECT choiceID FROM Choices WHERE questionNumber = 1;
SELECT choiceID FROM Choices WHERE questionNumber = 1 AND correct = “Y”;

SELECT string, hint FROM Questions WHERE num = 2;
SELECT choiceID FROM Choices WHERE questionNumber = 2;
SELECT choiceID FROM Choices WHERE questionNumber = 2 AND correct = “Y”;

SELECT string, hint FROM Questions WHERE num = 3;
SELECT choiceID FROM Choices WHERE questionNumber = 3;
SELECT choiceID FROM Choices WHERE questionNumber = 3 AND correct = “Y”;
