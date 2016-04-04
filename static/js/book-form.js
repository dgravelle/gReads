(function() {
  var addBookForm = document.getElementById('add-book__form');
  var addAuthorsBtn = document.getElementById('addAuthors');
  var authorsInput = document.getElementById('authorsInput');
  var authorsAdded = document.getElementById('authors-added');

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

    rightCol.innerHTML = "<a href=''><i class='material-icons remove-author'>clear</i></a>";
    leftCol.appendChild(input);
    newGrid.appendChild(leftCol);
    newGrid.appendChild(rightCol);
    authorsAdded.appendChild(newGrid);
    authorsInput.parentNode.classList.remove('is-invalid');
  }

  authorsAdded.addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('remove-author')) {
      this.removeChild(e.target.parentElement.parentElement.parentElement);
      e.stopPropagation();
    }
  });

  addAuthorsBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if (authorsInput.value === '' || authorsInput.value === null) {
      authorsInput.parentNode.classList.add('is-invalid');
    }
    else {
      addBookBlock(authorsInput.value);
      authorsInput.value = '';
    }
  });




    var title = document.getElementById('title');
    var genre = document.getElementById('genre');
    var coverImage = document.getElementById('coverImage');
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

    coverImage.addEventListener('blur', function() {
      var regUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
      if (!regUrl.test(this.value)) {
        this.parentElement.classList.add('is-invalid');
      }
    });

    description.addEventListener('blur', function() {
      if(description.value === '' || description.value === null) {
        this.parentElement.classList.add('is-invalid');
      }
    });

    authorsInput.addEventListener('blur', function() {
      if (this.value === '' && document.querySelector('input[name=bookTitle]') === null) {
        this.parentElement.classList.add('is-invalid');
      }
    });

    addBookForm.addEventListener('submit', function() {
      if (document.querySelector('input[name=bookTitle]') === null) {
        this.parentElement.classList.add('is-invalid');
      }
    });

  function validateInput(input) {
    if (input === null || input === '') {
      input.parentElement.classList.add('is-invalid');
    }
  }
})();
