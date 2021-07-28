/*assignment to create a quiz with a start button timer answer questions answer question time is substracted if wrong answer game if out of questions or time runs out, save my initials and  show high score on home screen of the quiz.*/

var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var validate = document.getElementById("validate");
var currentQ = 0;
var countTime = document.getElementById("timer");
var time = 0;
var myTimer;
var title = document.getElementById("title");
var intro = document.getElementById("intro");
var highScore = [];
var addHighScore = document.getElementById("addHighScore");
var listHighScore = document.querySelector('highScore')
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");

function renderLastRegistered() {
    var addHighScore = localStorage.getItem('highScore');
}

//keeping track of score
var score = 0;

function timer() {
    myTimer = setInterval(function () {
        if (time > 1) {
            countTime.innerHTML = "Timer: " + time;
        }
        else {
            countTime.innerHTML = 'complete';
            quizComplete();
        }
        time--;
    }, 1000);
}

// Add event listener to generate button
start.addEventListener("click", function () {
    validate.innerHTML = "";
    start.style.display = "none";
    quiz.style.display = "block";
    title.style.display = "none";
    intro.style.display = "none";
    score = 0;
    currentQ = 0;
    time = 150;
    timer();
    showQuestion(currentQ);
    showHighScore();
});

//show quesiton
function showQuestion(questionNumber) {
    if (questionNumber < question.length) {
        questionEl.innerHTML = question[questionNumber].question;
        choiceA.innerHTML = question[questionNumber].choiceA;
        choiceB.innerHTML = question[questionNumber].choiceB;
        choiceC.innerHTML = question[questionNumber].choiceC;
        choiceD.innerHTML = question[questionNumber].choiceD;
    }
    else {
        quizComplete();
    }
}
function quizComplete() {
    clearInterval(myTimer);
    start.style.display = "block";
    quiz.style.display = "none";
    validate.innerHTML = "Your Score Is " + score;
    addHighScore.style.display = "block";
}

//add high score
function submitHighScore() {
    highScore.push({
        initials: document.getElementById("initials").value,
        topScore: score
    });

    // Save highScore using `setItem()`
    localStorage.setItem('highScore', JSON.stringify(highScore));
    var pastHighScore = JSON.parse(localStorage.getItem('highScore'));
    addHighScore.style.display = "none";
    showHighScore();
}

//FUNCTION show high score
function showHighScore() {
    let highScoreText = "";
    for (var i = 0; i < highScore.length; i++) {
        highScoreText += "<p>" + highScore[i].initials + ": " + highScore[i].topScore + "</p>";
    }
    validate.innerHTML = highScoreText;
}

//check answers
function checkAnswer(choicePicked) {
    if (choicePicked === question[currentQ].correct) {
        score++
        validate.innerHTML = "Correct";
    }
    else {
        validate.innerHTML = "Wrong";
        time -= 10;
    }
    currentQ++;
    showQuestion(currentQ);
}