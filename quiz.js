var pos = 0;
var correct = 0;
var totalAttempts = 0;
var tryAgain = 0;
var test, testStatus, hint, question, choice, correctness, options, optA, optB, optC, optD;
var alertBox;
var questions = [
    "How often do you play tennis?",
    "Where do you usually eat lunch?",
    "How long did you study last night?"
]

var answers = [
    ["On Tuesday.", "For two hours.", "Almost every day.", "With John.", "C"],
    ["Sandwich.", "With Jane.", "At 12:00.", "In the cafeteria.", "D"],
    ["With Bob.", "In my room.", "English.", "For three hours.", "D"]
]

var hints = [
    "This question is asking about frequency.",
    "This question is asking about location.",
    "This question is asking about time."
]

var wrong = [
    "Try again!",
    "Wrong!",
    "One more time!"
]

// simplify commonly used function
function get(x) {
    return document.getElementById(x);
}

function askQuestion() {
    test = get("test");
    if (pos >= questions.length) {
        // end of test
        test.innerHTML = "<h2>You completed the quiz in "+totalAttempts+" totalAttempts.</h2>";
        get("testStatus").innerHTML = "Test completed";
        pos = 0;
        correct = 0;

        return false;
    }

    hint = get("hintBox");
    hint.innerHTML = "";

    get("testStatus").innerHTML = "Question "+(pos+1)+" of "+questions.length;
    question = questions[pos];
    optA = answers[pos][0];
    optB = answers[pos][1];
    optC = answers[pos][2];
    optD = answers[pos][3];

    test.innerHTML = "<h3>"+question+"</h3>";

    test.innerHTML += "<input type='radio' name='options' value='A'> "+optA+"<br>";
    test.innerHTML += "<input type='radio' name='options' value='B'> "+optB+"<br>";
    test.innerHTML += "<input type='radio' name='options' value='C'> "+optC+"<br>";
    test.innerHTML += "<input type='radio' name='options' value='D'> "+optD+"<br>";

    test.innerHTML += "<br><span id='submit'><button onclick='checkAnswer()'>Submit</button></div>";
    test.innerHTML += "<button onclick='giveHint()'>Hint</button>";
}

function giveHint() {
    hint = get("hintBox");
    hint.innerHTML = "<i>"+hints[pos]+"<br></br>";
}

function checkAnswer() {
    options = document.getElementsByName("options");
    for (var i=0; i<options.length; i++) {
        if (options[i].checked) {
            choice = options[i].value;
        }
    }

    alertBox = get("alert-id");

    if (choice==answers[pos][4]) {
        correct++;
        pos++;

        $(".alert").addClass("d-none");
        alertBox.innerHTML = "";

        alert("Correct!");
        tryAgain = 0;
    } else {
        $(".alert").removeClass("d-none");
        alertBox.innerHTML = "Sorry, that is incorrect. ";

        if (tryAgain > 0) {
            alertBox.innerHTML += "<strong>"+wrong[tryAgain-1]+"</strong>";
        }

        if (tryAgain == 3) {
            tryAgain = 0;
        } else {
            tryAgain++;
        }
    }

    totalAttempts++;


    askQuestion();
}


window.addEventListener("load", askQuestion, false);
