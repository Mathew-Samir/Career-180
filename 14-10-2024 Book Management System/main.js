// Function constructors for Author and Book
function Author(name, email) {
    this.name = name;
    this.email = email;
}

function Book(name, price, author) {
    this.name = name;
    this.price = price;
    this.author = author;
}

// Global array to hold books
let books = [];

// Current book index to edit
let currentEditIndex = null;

// Function to create form fields dynamically
function createFormFields(numBooks) {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Clear existing fields

    for (let i = 0; i < numBooks; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-entry');

        bookDiv.innerHTML = `
            <h3>Book ${i + 1}</h3>
            <input type="text" placeholder="Book Name" required />
            <input type="number" placeholder="Book Price" min="0" required />
            <input type="text" placeholder="Author Name" required />
            <input type="email" placeholder="Author Email" required />
        `;
        formContainer.appendChild(bookDiv);
    }
}

// Function to validate form and create books
function submitBooks() {
    const bookEntries = document.querySelectorAll('.book-entry');
    books = []; // Reset books array

    bookEntries.forEach((entry) => {
        const inputs = entry.querySelectorAll('input');
        const bookName = inputs[0].value;
        const bookPrice = parseFloat(inputs[1].value);
        const authorName = inputs[2].value;
        const authorEmail = inputs[3].value;

        if (bookName && !isNaN(bookPrice) && authorName && authorEmail) {
            const author = new Author(authorName, authorEmail);
            const book = new Book(bookName, bookPrice, author);
            books.push(book);
        }
    });

    displayBooks();
    document.getElementById('bookForm').style.display = 'none'; // Hide form after submission
}

// Function to display books in a table
function displayBooks() {
    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.author.name}</td>
            <td>${book.author.email}</td>
            <td>
                <button class="edit" onclick="openEditModal(${index})">Edit</button>
                <button class="delete" onclick="deleteBook(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to handle book deletion
function deleteBook(index) {
    books.splice(index, 1); // Remove book from array
    displayBooks(); // Refresh the table
}

// Function to open the edit modal with book data
function openEditModal(index) {
    const book = books[index];
    currentEditIndex = index; // Save the current index for saving

    // Set input values
    document.getElementById('editBookName').value = book.name;
    document.getElementById('editBookPrice').value = book.price;
    document.getElementById('editAuthorName').value = book.author.name;
    document.getElementById('editAuthorEmail').value = book.author.email;

    // Show the edit modal
    document.getElementById('editModal').style.display = 'block';
}

// Function to save changes after editing
function saveChanges() {
    const bookName = document.getElementById('editBookName').value;
    const bookPrice = parseFloat(document.getElementById('editBookPrice').value);
    const authorName = document.getElementById('editAuthorName').value;
    const authorEmail = document.getElementById('editAuthorEmail').value;

    if (bookName && !isNaN(bookPrice) && authorName && authorEmail) {
        const author = new Author(authorName, authorEmail);
        const book = new Book(bookName, bookPrice, author);

        // Update the current book in the books array
        books[currentEditIndex] = book;

        // Refresh the display and hide the modal
        displayBooks();
        document.getElementById('editModal').style.display = 'none';
    } else {
        alert('Please fill in all fields correctly.');
    }
}

// Function to cancel editing
function cancelEdit() {
    document.getElementById('editModal').style.display = 'none'; // Hide modal
}

// Event listeners
document.getElementById('createBooks').addEventListener('click', () => {
    const numBooks = parseInt(document.getElementById('numBooks').value);
    if (numBooks > 0) {
        createFormFields(numBooks);
        document.getElementById('bookForm').style.display = 'block';
    } else {
        alert("Please enter a valid number of books.");
    }
});

document.getElementById('submitBooks').addEventListener('click', submitBooks);
document.getElementById('saveEdit').addEventListener('click', saveChanges);
document.getElementById('cancelEdit').addEventListener('click', cancelEdit);

