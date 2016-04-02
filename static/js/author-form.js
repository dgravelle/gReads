
var addAuthorForm = document.getElementById('add-author__form');
var addBooksBtn = document.getElementById('addBooks');
var addBooksInput = document.getElementById('booksInput');
var booksWritten = document.getElementById('booksWritten');

function addBookBlock(bookTitle) {
  function newEl(el) {
    return document.createElement(el);
  }
  var newGrid = newEl("div");
  var leftCol = newEl("div");
  var rightCol = newEl("div");
  var input = newEl("input");

  input.setAttribute("value", bookTitle);
  input.setAttribute("name", "bookTitle");
  input.className = "mdl-textfield__input";

  newGrid.className = "mdl-grid";
  leftCol.className = "mdl-cell mdl-cell--10-col mdl-cell--7-col-tablet mdl-cell--3-col-phone";
  rightCol.className = "mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone";

  rightCol.innerHTML = "<a href=''><i class='material-icons remove-book'>clear</i></a>";
  leftCol.appendChild(input);
  newGrid.appendChild(leftCol);
  newGrid.appendChild(rightCol);
  booksWritten.appendChild(newGrid);
}

addBooksBtn.addEventListener('click', function(e) {
  e.preventDefault();

  if (addBooksInput.value === '' || addBooksInput.value === null) {
    addBooksInput.parentNode.classList.add('is-invalid');
  }
  else {
    addBookBlock(addBooksInput.value);
    addBooksInput.value = '';
  }
});

booksWritten.addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target.classList.contains('remove-book')) {
    this.removeChild(e.target.parentElement.parentElement.parentElement);
    e.stopPropagation();
  }
});

addAuthorForm.addEventListener('submit', function(e) {
  validateAuthorForm();
  console.log('submitted');
});

function validateForm() {
  
}
