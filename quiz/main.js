// // JavaScript function to start the quiz based on category and level
// function startQuiz(subject, level) {
//     alert(`Starting ${subject} quiz at ${level} level!`);
// }
// JavaScript function to start the quiz based on subject and level
function startQuiz(subject, level) {
    // Redirect to the specific HTML page based on subject and level
    window.location.href = `${subject}-${level}.html`;
}

