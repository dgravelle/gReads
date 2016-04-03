
var addAuthorForm = document.getElementById('add-author__form');
var addBooksBtn = document.getElementById('addBooks');
var booksInput = document.getElementById('booksInput');
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
  booksInput.parentNode.classList.remove('is-invalid');
}

addBooksBtn.addEventListener('click', function(e) {
  e.preventDefault();

  if (booksInput.value === '' || booksInput.value === null) {
    booksInput.parentNode.classList.add('is-invalid');
  }
  else {
    addBookBlock(booksInput.value);
    booksInput.value = '';
  }
});

booksWritten.addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target.classList.contains('remove-book')) {
    this.removeChild(e.target.parentElement.parentElement.parentElement);
    e.stopPropagation();
  }
});


  var title = document.getElementById('title');
  var genre = document.getElementById('genre');
  var bioImage = document.getElementById('bioImage');
  var description = document.getElementById('description');
  // var bookTitles = document.querySelector('name=bookTitle');

  title.addEventListener('blur', function() {
    if(title.value === '' || title.value === null) {
      title.parentElement.classList.add('is-invalid');
    }
  });

  genre.addEventListener('blur', function() {
    if(this.value === '' || this.value === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });

  bioImage.addEventListener('blur', function() {
    var regUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
    console.log(!regUrl.test(this.value));
    if (!regUrl.test(this.value)) {
      this.parentElement.classList.add('is-invalid');
    }
  });

  description.addEventListener('blur', function() {
    if(description.value === '' || description.value === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });

  booksInput.addEventListener('blur', function() {
    console.log(this.value);
    if (this.value === '' && document.querySelector('input[name=bookTitle]') === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });

  addAuthorForm.addEventListener('submit', function() {

    if (document.querySelector('input[name=bookTitle]') === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });

function validateInput(input) {
  if (input === null || input === '') {
    input.parentElement.classList.add('is-invalid');
  }
}
