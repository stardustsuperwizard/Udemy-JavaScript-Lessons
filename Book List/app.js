// Class Objects
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

        // Create a table with rows and cells
        // Create html <tr> element
        const row = document.createElement('tr');
        // inset the columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className) {
        // create div elements
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        // get html container
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        // insert alert
        container.insertBefore(div, form);

        // Set timeout of 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            // traverse the DOM to the parent Element
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {

    }
}


class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event Listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.getElementById('book-form').addEventListener('submit', bookForm);
document.getElementById('book-list').addEventListener('click', bookLists);


// Functions
function bookForm(event) {
    // This sets the vlaues of the variables to go into objects
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // this instantiates a Book object
    const book = new Book(title, author, isbn);

    // This will instaniate the UI (dynamic HTML content)
    const ui = new UI();

    // validate data
    if(title === '' || author === '' || isbn ==='') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // add book to list
        ui.addBookToList(book);
        Store.addBook(book);
        ui.showAlert('Book Added!', 'success');

        // UI clear fields
        ui.clearFields();
    }

    // prevent default actions from happening with button event
    event.preventDefault();
}

function bookLists(event) {
    // instantiate new UI
    const ui = new UI();

    // delete book
    ui.deleteBook(event.target);
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    // show alert
    ui.showAlert('book removed!', 'success');

    // prevent default actions from happening with button event
    event.preventDefault();
}