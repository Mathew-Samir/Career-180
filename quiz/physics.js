const quizApp = (() => {
    // Define easy questions with level property
    const easyQuestions = [
    {
        question: "What is the unit of force in the International System of Units (SI)?",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the speed of light in a vacuum?",
        options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "450,000 km/s"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the force that opposes motion between two surfaces that are in contact?",
        options: ["Tension", "Gravity", "Friction", "Magnetic force"],
        answer: 2,
        level: "easy"
    },
    {
        question: "Which of the following is an example of potential energy?",
        options: ["A rolling ball", "A compressed spring", "A flying airplane", "Sound waves"],
        answer: 1,
        level: "easy"
    },
    {
        question: "Which of the following is a scalar quantity?",
        options: ["Velocity", "Displacement", "Acceleration", "Speed"],
        answer: 3,
        level: "easy"
    },
    {
        question: "What is the rate of change of velocity called?",
        options: ["Displacement", "Acceleration", "Force", "Momentum"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the acceleration due to gravity on Earth?",
        options: ["9.8 m/s²", "12 m/s²", "8.5 m/s²", "15 m/s²"],
        answer: 0,
        level: "easy"
    },
    {
        question: "Which law states that for every action, there is an equal and opposite reaction?",
        options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Conservation of Energy"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What type of energy does a moving object have?",
        options: ["Kinetic energy", "Potential energy", "Thermal energy", "Chemical energy"],
        answer: 0,
        level: "easy"
    },
    {
        question: "What is the formula for calculating force?",
        options: ["Force = Mass x Velocity", "Force = Mass x Acceleration", "Force = Mass / Acceleration", "Force = Velocity x Acceleration"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What phenomenon causes objects to fall to the ground?",
        options: ["Magnetism", "Friction", "Inertia", "Gravity"],
        answer: 3,
        level: "easy"
    },
    {
        question: "What happens to the volume of most substances when they are heated?",
        options: ["It decreases", "It remains the same", "It increases", "It oscillates"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the tendency of an object to resist a change in its state of motion?",
        options: ["Momentum", "Friction", "Inertia", "Gravity"],
        answer: 2,
        level: "easy"
    },
    {
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Wind", "Petroleum"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the unit of electrical resistance?",
        options: ["Ampere", "Ohm", "Volt", "Watt"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What type of wave is sound?",
        options: ["Electromagnetic wave", "Transverse wave", "Longitudinal wave", "Gamma wave"],
        answer: 2,
        level: "easy"
    },
    {
        question: "Which law relates current, voltage, and resistance in a circuit?",
        options: ["Faraday's Law", "Ohm's Law", "Kirchhoff's Law", "Coulomb's Law"],
        answer: 1,
        level: "easy"
    },
    {
        question: "What is the time taken for one complete cycle of a wave called?",
        options: ["Frequency", "Amplitude", "Period", "Wavelength"],
        answer: 2,
        level: "easy"
    },
    {
        question: "What is the measure of the average kinetic energy of particles in a substance?",
        options: ["Heat", "Temperature", "Work", "Power"],
        answer: 1,
        level: "easy"
    },
    {
        question: "Which device is used to measure electric current?",
        options: ["Voltmeter", "Ammeter", "Ohmmeter", "Thermometer"],
        answer: 1,
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
