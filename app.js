const myLibrary = [];
//Init
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
  displayBooks() {
    let cards = document.querySelector(".cards");
    cards.innerHTML = "";

    myLibrary.forEach(function (book) {
      let card = document.createElement("div");
      card.classList.add("card");

      let title = document.createElement("div");
      let author = document.createElement("div");
      let pages = document.createElement("div");
      let status = document.createElement("div");

      if (book.status) {
        status.classList.add("true");
      } else {
        status.classList.add("false");
      }

      title.textContent = book.title;
      author.textContent = book.author;
      pages.textContent = book.pages;
      status.textContent = "";

      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(pages);
      card.appendChild(status);

      cards.appendChild(card);
    });
  }
}

const addBtn = document.querySelector(".addBtn");
const dialog = document.querySelector("#dialog");
const form = document.querySelector("#bookForm");
const cards = document.querySelector(".cards");
const pageInput = document.querySelector("#pages");

addBtn.addEventListener("click", showForm);
form.addEventListener("submit", handleSubmit);
dialog.addEventListener("click", closeModal);
cards.addEventListener("click", handleStatus);
pageInput.addEventListener("input", setCustomMessageForRangeFlow);

function setCustomMessageForRangeFlow() {
  if (pageInput.validity.rangeOverflow) {
    pageInput.setCustomValidity("21450 is the world record?");
  } else if (pageInput.validity.rangeUnderflow) {
    pageInput.setCustomValidity("Pages can't be negative");
  } else {
    // Clear custom validity message
    pageInput.setCustomValidity("");
  }
}

function showForm() {
  dialog.showModal();
}

function handleSubmit(e) {
  e.preventDefault();

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let status = document.querySelector("#status").checked;

  let index = myLibrary.length;
  myLibrary.push(new Book(title, author, pages, status));
  myLibrary[index].displayBooks();

  form.reset();

  // Optionally, close the dialog after form submission
  dialog.close();
}

function closeModal(e) {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
}

function handleStatus(e) {
  const card = e.target.closest(".card");
  if (card && e.target === card.lastElementChild) {
    // Find the index of the clicked card in the DOM
    const index = Array.from(cards.children).indexOf(card);

    let currentBook = myLibrary[index];

    // Toggle the status of the book at that index
    currentBook.status = !currentBook.status;
    currentBook.displayBooks();
  }
}
