// handle adding new book, closing popup form
// if the event is 'click' here, required attribute doesn't work
document.getElementById('addButton').addEventListener('click', event => addBookToLibrary(event))

let popup = document.getElementById("popup");
//the close button that closes the popup
document.getElementsByClassName('close')[0].addEventListener('click', () => {
    popup.style.display = "none";
});
document.getElementById('newBook').addEventListener('click', () => {
    popup.style.display = "block";
});
// When the user clicks anywhere outside of the modal, close it
// source: https://www.w3schools.com/howto/howto_css_modals.asp
window.onclick = function(event) {
  if (event.target === popup) {
    popup.style.display = "none";
  }
}

///////

let myLibrary = [];
//let popupForm = document.getElementById('popupForm');
let container = document.querySelector('.display-container');
let books;

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages + ' pages';
        this.read = read;
    }
}

function addBookToLibrary(event) {
    event.preventDefault(); //Handle not sending form to a server
    popup.style.display = 'none'; //Close popup form after adding new book

    let newBook = new Book(
                            popupForm.author.value, 
                            popupForm.title.value, 
                            popupForm.pages.value, 
                            popupForm.read.checked);
    myLibrary.push(newBook);
    popupForm.reset(); //https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
    createBook(newBook);
    //display();
}

function createBook(book) {
    let bookDiv = document.createElement('div');
    let bookId = `${myLibrary.indexOf(book)}`;
    let title = document.createElement('div');
    let author = document.createElement('div');
    let pages = document.createElement('div');
    let info = document.createElement('div');

    title.textContent = 'Title: ' + book.title;
    author.textContent = 'Author: ' + book.author;
    pages.textContent = 'Number of pages: ' + book.pages;
    info.classList.add('info');

    info.append(title, author, pages);

    // Create read status button
    let readDiv = document.createElement('div');
    let label = document.createElement('label');
    let readBtn = document.createElement('input');
    
    readDiv.classList.add('readBtn-container');
    label.setAttribute('for', 'readBtn');
    label.textContent = 'Read?';
    readBtn.setAttribute('type', 'checkbox');
    readBtn.setAttribute('name', 'readBtn');
    readBtn.setAttribute('id', 'readBtn');
    if (book.read) {
        readBtn.checked = true;
    }
    readBtn.addEventListener('click', event => readStatus(event));
    readDiv.append(label, readBtn);

    // Create remove button
    let rmBtn = document.createElement('button');
    rmBtn.textContent = 'Remove';
    rmBtn.setAttribute('id', 'rmBtn_' + bookId);
    rmBtn.setAttribute('class', 'rmBtn')
    rmBtn.addEventListener('click', event => removeBook(event));

    bookDiv.classList.add('book-wrapper');
    bookDiv.setAttribute('id', bookId);
    bookDiv.append(info, readDiv, rmBtn);
    container.append(bookDiv);
}

// This function was created because at first I forgot how to pass event to addEventListener
// to deal with not-created node yet
// function display() {
//     let rmBtn = document.createElement('button');

//     // create remove button and append all to book div
//     books = document.querySelectorAll('.book-wrapper');
//     for (const book of books) {
//         // display runs every time a new book is added
//         // no need to add a remove button to html elements if one already exists
//         if (!book.contains(document.getElementById('rmBtn_' + book.id))) {
//             rmBtn.textContent = 'Remove';
//             rmBtn.setAttribute('id', 'rmBtn_' + book.id);
//             rmBtn.addEventListener('click', event => removeBook(event));
//             book.append(rmBtn);
//         }
//     }
// }

function readStatus(event) {
    let bookId = event.target.parentNode.parentNode.id;
    myLibrary[bookId].read = !myLibrary[bookId].read;
}

function removeBook(event) {
    let rmBtnId = event.target.id;
    let bookId = rmBtnId.slice(6);
    let bookDiv = document.getElementById(bookId);
    // remove HTML book div
    for (let i = 0; i < bookDiv.children; i++) {
        bookDiv.removeChild(bookDiv.children[i])
    }
    bookDiv.remove();

    // remove book object in myLibrary
    myLibrary.splice(bookDiv.id, 1);

    // update book div's id and rmBtn's id to match with its index in myLibrary
    let bookDivs = document.querySelectorAll('.book-wrapper');
    for (const bookDiv of bookDivs) {
        let title = bookDiv.firstChild.firstChild.textContent.slice(7);
        let bookObj = myLibrary.find(book => book.title === title);
        bookDiv.id = myLibrary.indexOf(bookObj);
        let rmBtn = bookDiv.querySelector('button');
        rmBtn.setAttribute('id', `rmBtn_${myLibrary.indexOf(bookObj)}`);
    }
}

