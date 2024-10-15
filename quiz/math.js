const quizApp = (() => {
    // Define easy questions with level property
const easyQuestions = [
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the square root of 16?",
        options: ["2", "4", "6", "8"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is 9 x 8?",
        options: ["72", "81", "64", "88"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is 100 divided by 4?",
        options: ["20", "25", "30", "35"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the value of π (pi) up to two decimal places?",
        options: ["3.12", "3.14", "3.16", "3.18"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is 2 to the power of 5?",
        options: ["8", "16", "32", "64"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the perimeter of a rectangle with length 5 and width 3?",
        options: ["8", "15", "16", "20"],
        answer: 2,
        level: "easy"
    },
    {
        question: "If x + 5 = 12, what is the value of x?",
        options: ["6", "7", "5", "8"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the area of a triangle with base 6 and height 4?",
        options: ["10", "12", "24", "18"],
        answer: 1,
        level: "easy"
    },
    {
        question: "Which number is a prime number?",
        options: ["4", "6", "9", "11"],
        answer: 3,
        level: "easy"
    },
    {
        question: "What is the sum of the angles in a triangle?",
        options: ["90 degrees", "180 degrees", "360 degrees", "270 degrees"],
        answer: 1,
        level: "easy"
    },
    {
        question: "If 6 apples cost $3, how much does 1 apple cost?",
        options: ["$0.50", "$1", "$1.50", "$2"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the value of 10% of 200?",
        options: ["20", "30", "15", "25"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the next number in the sequence: 2, 4, 6, 8, ...?",
        options: ["10", "12", "14", "16"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the volume of a cube with side length 3?",
        options: ["9", "18", "27", "36"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the least common multiple (LCM) of 3 and 4?",
        options: ["6", "8", "9", "12"],
        answer: 3,
        level: "easy"
    },
    {
        question: "What is 45% of 200?",
        options: ["90", "100", "85", "95"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the result of 3³ (3 to the power of 3)?",
        options: ["6", "9", "27", "18"],
        answer: 2,
        level: "easy"
    },
    {
        question: "How many sides does a pentagon have?",
        options: ["4", "5", "6", "7"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the greatest common divisor (GCD) of 12 and 16?",
        options: ["2", "3", "4", "6"],
        answer: 2,
        level: "easy"
    }
];



    const state = {
        currentQuestionIndex: 0,
        score: 0,
        timer: 120, // 2 minutes
        draftedQuestions: [],
        draftScores: [],
        currentQuestion: null,
        timeOver: false,
        quizQuestions: [],
    };

    const shuffleQuestions = (questions) => questions.sort(() => Math.random() - 0.5);
    
    const startQuiz = () => {
        // Only use easyQuestions now
        state.quizQuestions = shuffleQuestions([...easyQuestions]);
        state.currentQuestionIndex = 0;
        state.score = 0;
        state.timer = 120;
        state.draftedQuestions = [];
        state.draftScores = [];
        state.timeOver = false;
        displayNextQuestion();
        startTimer();
    };

    const startTimer = () => {
        const timerInterval = setInterval(() => {
            if (state.timer <= 0) {
                clearInterval(timerInterval);
                endQuiz("Time is Over");
                return;
            }
            if (state.timeOver) {
                clearInterval(timerInterval);
            }
            state.timer -= 1;
            document.getElementById('time').innerText = state.timer;
        }, 1000);
    };

    const displayNextQuestion = () => {
        const questionContainer = document.getElementById('question-container');
        const questionData = state.quizQuestions[state.currentQuestionIndex];
        state.currentQuestion = questionData;

        questionContainer.innerHTML = `
            <p>Question ${state.currentQuestionIndex + 1}: ${questionData.question}</p>
            <ul>
                ${questionData.options.map((option, index) => `<li><label><input type="radio" name="answer" value="${index}"> ${option}</label></li>`).join('')}
            </ul>
        `;
    };

    const submitAnswer = () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        // If no answer is selected, show an alert message
        alert("Please select an answer before submitting.");
        return; // Stop further execution if no answer is selected
    }

    const questionData = state.currentQuestion;
    const isCorrect = parseInt(selectedAnswer.value) === questionData.answer;
    const points = 1; // Now all questions are easy, assign 1 point

    if (isCorrect) {
        state.score += points;
    }

    // Move to the next question if an answer was selected
    nextQuestion();
    };


    const draftAnswer = () => {
        // Add the current question to draftedQuestions if not already drafted
        if (!state.draftedQuestions.includes(state.currentQuestion)) {
            state.draftedQuestions.push(state.currentQuestion);
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        if (state.currentQuestionIndex + 1 < state.quizQuestions.length) {
            state.currentQuestionIndex += 1;
            displayNextQuestion();
        } else {
            endQuiz();
        }
    };

    const endQuiz = (message = null) => {
        state.timeOver = true; // Stop the timer
        const resultContainer = document.getElementById('result-container');
        const resultText = document.getElementById('result-text');
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.classList.add('hidden');

        if (message) {
            resultText.innerText = message;
        } else {
            const finalScore = state.score;
            if (finalScore <= 7) {
                resultText.innerText = `Bad. Your score is ${finalScore}`;
            } else if (finalScore <= 14) {
                resultText.innerText = `Fair. Your score is ${finalScore}`;
            } else {
                resultText.innerText = `Good. Your score is ${finalScore}`;
            }
        }

        resultContainer.classList.remove('hidden');
    };

    const viewDraftedQuestions = () => {
        if (state.draftedQuestions.length === 0) {
            alert("No drafted questions to answer.");
            return;
        }

        const draftContainer = document.getElementById('draft-container');
        const draftQuestionsContainer = document.getElementById('draft-questions-container');
        const resultContainer = document.getElementById('result-container');
        resultContainer.classList.add('hidden');

        draftQuestionsContainer.innerHTML = state.draftedQuestions.map((question, index) => `
            <div class="draft-question">
                <p>Drafted Question ${index + 1}: ${question.question}</p>
                <ul>
                    ${question.options.map((option, optIndex) => `<li><label><input type="radio" name="draft-answer-${index}" value="${optIndex}"> ${option}</label></li>`).join('')}
                </ul>
            </div>
        `).join('');

        // Change buttons to submit drafts
        draftQuestionsContainer.innerHTML += `<button id="submit-drafts">Submit Drafts</button>`;

        draftContainer.classList.remove('hidden');

        // Attach event listener for submitting drafts
        document.getElementById('submit-drafts').addEventListener('click', submitDrafts);
    };

    const submitDrafts = () => {
        const draftQuestionsContainer = document.getElementById('draft-questions-container');
        const draftAnswers = draftQuestionsContainer.querySelectorAll('.draft-question');

        draftAnswers.forEach((draftQuestion, index) => {
            const selected = draftQuestion.querySelector(`input[name="draft-answer-${index}"]:checked`);
            if (selected) {
                const answer = parseInt(selected.value);
                const question = state.draftedQuestions[index];
                const isCorrect = answer === question.answer;
                const points = 1; // All questions are easy, assign 1 point
                if (isCorrect) {
                    state.score += points;
                }
            }
        });

        const draftContainer = document.getElementById('draft-container');
        draftContainer.classList.add('hidden');

        // Clear drafted questions after submission
        state.draftedQuestions = [];

        // Show final results
        endQuiz();
    };

    const attachEventListeners = () => {
        document.getElementById('submit-answer').addEventListener('click', submitAnswer);
        document.getElementById('draft-answer').addEventListener('click', draftAnswer);
        document.getElementById('view-drafts').addEventListener('click', viewDraftedQuestions);
        document.getElementById('finish-drafts').addEventListener('click', () => {
            // Optional: Handle if needed
            // Currently, drafts are handled via 'Submit Drafts' button
        });
    };

    return {
        init: () => {
            attachEventListeners();
            startQuiz();
        }
    };
})();

// after completeing questions  [button [try again with random question] - end the app[login app again]]
function tryAgain() {
    window.location.href = `index.html`;
}

window.onload = quizApp.init;
