(function() {
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
    input.setAttribute("name", "authors");
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
})();
