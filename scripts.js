// handle adding new, book, closing popup form
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

let myLibrary = [];
let popupForm = document.getElementById('popupForm');
let container = document.querySelector('.display-container');

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;;
        this.read = read;
    }
}

function createBook(book) {
    let div = document.createElement('div');
    div.classList.add('book-wrapper');
    let bookId = `${myLibrary.indexOf(book)}`;
    div.setAttribute('id', bookId);
    let title = document.createElement('div');
    //book.classList.add('book-container');
    title.textContent = book.title;
    // let readBtn =  document.createElement('button');
    // readBtn.setAttribute('id', `readBtn${myLibrary.indexOf(this)+1}`);
    
    let rmBtn = document.createElement('button');
    rmBtn.textContent = 'Remove';
    rmBtn.setAttribute('id', 'rmBtn_'+bookId);
    rmBtn.classList.add('rmBtn');
    div.append(title, rmBtn);
    //rmBtn.addEventListener('click', (bookId) => document.getElementById(bookId).remove())
    container.append(div);
}

let books = document.querySelectorAll

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
}

