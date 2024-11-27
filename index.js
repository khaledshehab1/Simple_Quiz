// array of objects
const questions = [
    {
        question: "Which is the largest reiver in the world?",
        answers: [
            {text: "Amazone", correct: "false"},
            {text: "Nile", correct: "true"},
            {text: "Euphrates", correct: "false"},
            {text: "Danube", correct: "false"},
        ]
    },
    {
        question: "What is the capital city of Australia?",
        answers: [
            {text: "Sydney", correct: "false"},
            {text: "Melbourne", correct: "false"},
            {text: "Canberra ", correct: "true"},
            {text: "Brisbane", correct: "false"},
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: "K2", correct: "false"},
            {text: "Mount Everest", correct: "true"},
            {text: "Mount Kilimanjaro", correct: "false"},
            {text: "Denali", correct: "false"},
        ]
    },
    {
        question: "Who painted the 'Mona Lisa'?",
        answers: [
            {text: "Leonardo da Vinci ", correct: "true"},
            {text: "Michelangelo", correct: "false"},
            {text: "Raphael", correct: "false"},
            {text: "Caravaggio", correct: "false"},
        ]
    },
]
const que = document.getElementById("question");
const ans = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let index = 0;
let score = 0;
function startQuiz()
{
    index = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion = questions[index];
    let queNumber = index + 1;
    que.innerHTML = queNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        ans.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click",selectAnswer);
    })
}
function selectAnswer(e)
{
    const select = e.target;
    const iscorrect = select.dataset.correct === "true";
    if(iscorrect){
        select.classList.add("correct");
        score++;
    }else{
        select.classList.add("incorect");
    }
    Array.from(ans.children).forEach((button)=>{
        // if(button.dataset.correct === "true")
        // {
        //     button.classList.add("correct");
        // }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function resetState()
{
    nextBtn.style.display = "none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild);
    }
}

function showScore()
{
    resetState();
    que.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "play Again";
    nextBtn.style.display = "block";
}

function handleNextButton()
{
    index = index+1;
    if(index < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if(index < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();