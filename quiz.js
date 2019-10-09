var pos = 0;
var correct = 0;
var test, testStatus, hint, question, choice, options, optA, optB, optC, optD;
var questions = [
    ["How often do you play tennis?", "On Tuesday.", "For two hours.", "Almost every day.", "With John.", "C"],
    ["Where do you usually eat lunch?", "Sandwich.", "With Jane.", "At 12:00.", "In the cafeteria.", "D"],
    ["How long did you study last night?", "With Bob.", "In my room.", "English.", "For three hours.", "D"]
]

var hints = [
    "This question is asking about frequency.",
    "This question is asking about location.",
    "This question is asking about time."
]

// simplify commonly used function
function get(x) {
    return document.getElementById(x);
}

function askQuestion() {
    test = get("test");
    if (pos >= questions.length) {
        // end of test
        test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
        get("testStatus").innerHTML = "Test completed";
        pos = 0;
        correct = 0;

        return false;
    }

    get("testStatus").innerHTML = "Question "+(pos+1)+" of "+questions.length;
    question = questions[pos][0];
    optA = questions[pos][1];
    optB = questions[pos][2];
    optC = questions[pos][3];
    optD = questions[pos][4];

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
    hint.innerHTML = "<br>"+hints[pos];
}

function checkAnswer() {
    options = document.getElementsByName("options");
    for (var i=0; i<options.length; i++) {
        if (options[i].checked) {
            choice = options[i].value;
        }
    }

    if (choice==questions[pos][5]) {
        correct++;
        hint = get("hintBox");
        hint.innerHTML = "";
    }

    pos++;

    askQuestion();
}

window.addEventListener("load", askQuestion, false);
