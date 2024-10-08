document.getElementById('addButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    
    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('ageError').textContent = '';
    document.getElementById('emailError').textContent = '';

    // Validation
    const namePattern = /^[A-Za-z\s]+$/; // Allow letters and spaces
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Name validation
    if (name.length < 4 || !namePattern.test(name)) {
        document.getElementById('nameError').textContent = "Please enter a valid name (at least 4 letters, letters and spaces only).";
        isValid = false;
    }
    
    // Age validation: should be between 10 and 70
    if (isNaN(age) || age < 10 || age > 70) {
        document.getElementById('ageError').textContent = "Please enter a valid age (between 10 and 70).";
        isValid = false;
    }

    // Email validation
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Please enter a valid email.";
        isValid = false;
    }

    // Stop if validation fails
    if (!isValid) {
        return; 
    }

    // Create a new row in the table if validation passes
    const table = document.getElementById('dataTable');
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const ageCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);

    nameCell.textContent = name;
    ageCell.textContent = age;
    emailCell.textContent = email;

});



