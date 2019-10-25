var num = 1;
var question = '';
var choiceArray = [];;
var alertBox;
var correct, totalAttempts, tryAgain, numQuestions;
correct = totalAttempts = tryAgain = numQuestions = 0;
var wrong = [
    "Try again!",
    "Wrong!",
    "One more time!"
]

function loadTest() { // Initiates quiz and removes button
    var element = document.getElementById("init");
    element.parentNode.removeChild(element);

    $('#buttons').show();

    var requestURL = '/numQuestions';

    $.ajax({
        url: requestURL,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            numQuestions = data[0]['COUNT(*)'];
        }
    })

    loadData();
}

function loadData() {
    $('#testStatus').html("Question "+num);

    $.ajax({ // POST question number
        url: 'postMsg',
        type: 'POST',
        data: {
            questNum: num
        }
    })

    var requestURL = '/questionOptions';

    $.ajax({
        url: requestURL,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            question = data[0].string;
            for (var i = 0; i < data.length; i++) {
                choiceArray.push(data[i].choiceID);
            }
            loadQuestion(question, choiceArray);
        }
    })
}

function loadQuestion(quest, choices) {
    $('#question').html(quest);

    var buttonOptions = document.getElementById('buttonOptions');
    buttonOptions.innerHTML = '';
    choiceArray = [];
    for (var i = 0; i < choices.length; i++) {
        choices[i]
        buttonOptions.innerHTML += `<input type='radio' name='buttonOptions'>
                                <label id='label${i}'>${choices[i]}</label><br>`;
    }
}

function getHint() {
    var requestURL = '/hint';

    $.ajax({
        url: requestURL,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            $('#hintBox').html(data[0].hint);
        }
    })
}

function submit() {
    var buttonOptions = document.getElementsByName('buttonOptions');
    var userChoice = '';

    for (var i = 0; i < buttonOptions.length; i++) {
        if (buttonOptions[i].checked) {
            userChoice = document.getElementById('label'+i).textContent;
            break;
        }
    }

    var requestURL = '/submit';

    $.ajax({
        url: requestURL,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            alertBox = document.getElementById("alert-id");

            var correctAnswer = data[0].choiceID;
            if (userChoice == correctAnswer) { // CORRECT
                num++;
                correct++;
                $(".alert").addClass("d-none");
                alertBox.innerHTML = "";

                alert("Correct!");
                tryAgain = 0;

                if (num > numQuestions) {
                    $('#test').html(`<h2>You completed the quiz in ${totalAttempts+1} total attempts.</h2>`);
                    $('#testStatus').html("Test completed");
                    num = 1;
                    correct = 0;
                } else {
                    loadData();
                };
            } else { // INCORRECT
                alertBox.innerHTML = "Sorry, that is incorrect. ";

                if (tryAgain > 0) {
                    alertBox.innerHTML += "<strong>"+wrong[tryAgain-1]+"</strong>";
                    if (tryAgain == 3) {
                        tryAgain = 0;
                    }
                }
                tryAgain++;
            }

            totalAttempts++;
        }
    })
}
