    let totalPersons = 0;
    let users = [];

    function getNumberOfPersons() {
      const numPersons = document.getElementById('numPersons').value;
      if (numPersons > 0 && numPersons <= 10) {
        totalPersons = parseInt(numPersons);
        generateUserForms(totalPersons);
      } else {
        alert('Please enter a number between 1 and 10.');
      }
    }

    function generateUserForms(num) {
      const container = document.getElementById('userFormContainer');
      container.innerHTML = ''; // Clear previous forms if any

      for (let i = 0; i < num; i++) {
        container.innerHTML += `
          <h3>User ${i + 1}</h3>
          <label for="name${i}" >Name: (4-10 characters):</label>
          <input type="text" id="name${i}" minlength="4" maxlength="10" placeholder="Enter name 4-10 characters">
          <br>
          <label for="age${i}">Age: (11-59):</label>
          <input type="number" id="age${i}" min="11" max="59" />
          <br><br>
        `;
      }

      container.innerHTML += `<button onclick="submitUsers()">Submit Users</button>`;
    }

    function submitUsers() {
      users = [];
      let valid = true;

      for (let i = 0; i < totalPersons; i++) {
        const name = document.getElementById(`name${i}`).value;
        const age = document.getElementById(`age${i}`).value;

        if (name.length < 4 || name.length > 10) {
          alert(`User ${i + 1}: Name must be between 4 and 10 characters.`);
          valid = false;
          break;
        }

        if (age < 11 || age > 59) {
          alert(`User ${i + 1}: Age must be between 11 and 59.`);
          valid = false;
          break;
        }

        users.push({ name, age });
      }

      if (valid) {
        displayUsersTable();
      }
    }

    function displayUsersTable() {
      const tableContainer = document.getElementById('tableContainer');
      let tableHTML = `
        <h2>User Information</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
      `;

      users.forEach(user => {
        tableHTML += `
          <tr>
            <td>${user.name}</td>
            <td>${user.age}</td>
          </tr>
        `;
      });

      tableHTML += `</table>`;
      tableContainer.innerHTML = tableHTML;
    }