const myLibrary = [];

//Book constructor
function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status; 
}

//Book prototpe method that takes user inputs and store the new Book object into an array
Book.prototype.addBookToLib = function(){
    myLibrary.push(this);
}

//looks through array and display each book on the page
Book.prototype.displayBooks = function(){

    let cards = document.querySelector('.cards');
    cards.innerHTML = '';  //Clear existing content
    
    myLibrary.forEach(function(book){
        
        let card = document.createElement('div');
        card.classList.add('card');

        let title = document.createElement('div');
        let author = document.createElement('div');
        let pages = document.createElement('div');
        let status = document.createElement('div');

        if (book.status){
            status.classList.add('true');
        } else {
            status.classList.add('false');
        }

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        status.textContent = '';

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);

        cards.appendChild(card);
    });
}

const addBtn = document.querySelector('.addBtn');
const dialog = document.querySelector('#dialog');
const form = document.querySelector('#bookForm');

addBtn.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', function(e){
    e.preventDefault();

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let status = document.querySelector('#status').checked;

    const newBook = new Book(title, author, pages, status);
    newBook.addBookToLib();
    newBook.displayBooks();

    form.reset();
                
    // Optionally, close the dialog after form submission
    dialog.close();
});

//Close dailog when clicked outside of it without changing entered value
dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  });