// Variables to store current and previous inputs, and the selected operator
let currentInput = '', previousInput = '', operator = null; 


// Get the display element from the DOM (now using class selector)
const display = document.querySelector('.display');

// Function to append a number or decimal to the current input
// Prevents multiple decimal points from being entered
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
    currentInput += number;  // Add the number or decimal to the current input
    updateDisplay(currentInput);  // Update the display with the new input
}

// Function to update the calculator's display
// Accepts a value and displays it on the screen
function updateDisplay(value) {
    display.textContent = value;  // Set the content of the display element
}

// Function to handle various operations (e.g., +, -, *, /, =, clear, round, random)
// Determines which operation was selected and performs the appropriate calculation
function performOperation(operation) {
    // Clear the display and reset inputs if the 'clear' operation is selected
    if (operation === 'clear') {
        clearDisplay();
        return;
    }

    // Generate a random number if the 'Rnd' (random) operation is selected
    if (operation === 'Rnd') {
        currentInput = Math.random().toString();  // Generate random number
        updateDisplay(currentInput);  // Display the random number
        return;
    }

    // Round the current input to the nearest integer if 'round' is selected
    if (operation === 'round') {
        if (currentInput) {
            currentInput = Math.round(parseFloat(currentInput)).toString(); // Round input
            updateDisplay(currentInput);  // Display the rounded value
        }
        return;
    }

    // Calculate the result if the '=' button is pressed
    if (operation === '=') {
        if (!operator || !previousInput) return;  // No operation to perform
        calculate();  // Perform the calculation
        updateDisplay(currentInput);  // Display the result
        operator = null;  // Reset the operator for the next operation
        return;
    }

    // Handle basic operations (+, -, *, /)
    if (currentInput === '') return;  // If no current input, do nothing

    // If there's already a previous input, perform the pending calculation
    if (previousInput) {
        calculate();
    }

    // Set the operator for the new operation and store the current input as previous input
    operator = operation;
    previousInput = currentInput;
    currentInput = '';  // Reset the current input for the next number
}

// Function to perform the calculation based on the operator
// Handles basic arithmetic operations (addition, subtraction, multiplication, division)
function calculate() {
    let result;
    const prev = parseFloat(previousInput);  // Convert previous input to a number
    const current = parseFloat(currentInput);  // Convert current input to a number

    // Return if either the previous or current input is not a valid number
    if (isNaN(prev) || isNaN(current)) return;

    // Perform the operation based on the selected operator
    switch (operator) {
        case '+':
            result = prev + current;  // Add the numbers
            break;
        case '-':
            result = prev - current;  // Subtract the numbers
            break;
        case '*':
            result = prev * current;  // Multiply the numbers
            break;
        case '/':
            if (current === 0) {
                result = 'Error';  // Handle divide by zero error
            } else {
                result = prev / current;  // Divide the numbers
            }
            break;
        default:
            return;
    }

    // Update the current input with the result and reset the previous input
    currentInput = result.toString();  // Convert the result back to a string for display
    previousInput = '';  // Clear the previous input
}

// Function to clear the display and reset all inputs and the operator
function clearDisplay() {
    currentInput = '';  // Reset the current input
    previousInput = '';  // Reset the previous input
    operator = null;  // Clear the operator
    updateDisplay('0');  // Reset the display to show 0
}
