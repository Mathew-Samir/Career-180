const quizApp = (() => {
    // Define easy questions with level property
    const easyQuestions = [
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "H2"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the pH level of pure water?",
        options: ["0", "7", "14", "10"],
        answer: 1,
        level: "easy"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Osmium", "Oxygen", "Gold", "Iron"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the main gas found in the air we breathe?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the chemical formula for table salt?",
        options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the atomic number of hydrogen?",
        options: ["1", "2", "3", "4"],
        answer: 0,
        level: "easy"
    },
    {
        question: "Which part of the atom has a positive charge?",
        options: ["Electron", "Neutron", "Proton", "Nucleus"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        answer: 0,
        level: "easy"
    },
    {
        question: "Which gas is produced when vinegar and baking soda react?",
        options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
        answer: 1,
        level: "easy"
    },
    {
        question: "Which element is a liquid at room temperature?",
        options: ["Mercury", "Oxygen", "Iron", "Helium"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the process of turning a liquid into a gas called?",
        options: ["Condensation", "Evaporation", "Sublimation", "Freezing"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the main component of natural gas?",
        options: ["Ethane", "Methane", "Propane", "Butane"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What type of bond involves the sharing of electron pairs?",
        options: ["Ionic Bond", "Covalent Bond", "Metallic Bond", "Hydrogen Bond"],
        answer: 1,
        level: "easy"
    },
    {
        question: "Which element is essential for respiration in humans?",
        options: ["Carbon", "Hydrogen", "Oxygen", "Nitrogen"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the chemical formula for glucose?",
        options: ["C6H12O6", "C12H22O11", "CH4", "C2H5OH"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What type of reaction occurs when an acid and a base combine?",
        options: ["Synthesis", "Decomposition", "Neutralization", "Combustion"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the periodic table element with the symbol 'He'?",
        options: ["Hydrogen", "Helium", "Hafnium", "Holmium"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the primary gas that plants use during photosynthesis?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What type of bond forms between two metals?",
        options: ["Ionic Bond", "Covalent Bond", "Metallic Bond", "Hydrogen Bond"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the main product of the combustion of hydrocarbons?",
        options: ["Carbon Monoxide", "Water", "Carbon Dioxide", "Oxygen"],
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
