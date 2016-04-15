(function() {
  var addBooksBtn = document.getElementById('addBooks');
  var bookInput = document.getElementById('bookInput');
  var booksAdded = document.getElementById('booksWritten');

  function addAuthorBlock(title) {
    function newEl(el) {
      return document.createElement(el);
    }
    var newGrid = newEl("div");
    var leftCol = newEl("div");
    var rightCol = newEl("div");
    var bookTitle = newEl("input");

    bookTitle.setAttribute("value", title);
    bookTitle.setAttribute("name", "title");
    bookTitle.className = "mdl-textfield__input";

    newGrid.className = "mdl-grid";
    leftCol.className = "mdl-cell mdl-cell--10-col mdl-cell--7-col-tablet mdl-cell--3-col-phone";
    rightCol.className = "mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone";

    rightCol.innerHTML = "<a href=''><i class='material-icons remove-book'>clear</i></a>";
    leftCol.appendChild(bookTitle);
    newGrid.appendChild(leftCol);
    newGrid.appendChild(rightCol);
    booksAdded.appendChild(newGrid);
    bookInput.parentNode.classList.remove('is-invalid');
  }

  booksAdded.addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('remove-book')) {
      this.removeChild(e.target.parentElement.parentElement.parentElement);
      e.stopPropagation();
    }
  });

  addBooksBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('adding authors');

    if (bookInput.value === '' || bookInput.value === null) {
      bookInput.parentNode.classList.add('is-invalid');
    }
    else {
      addAuthorBlock(bookInput.value);
      bookInput.value = '';
    }
  });
})();
