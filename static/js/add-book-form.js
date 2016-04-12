(function() {
  var addAuthorsBtn = document.getElementById('addAuthors');
  var authorsFirstInput = document.getElementById('authorsFirstInput');
  var authorsLastInput = document.getElementById('authorsLastInput');
  var authorsAdded = document.getElementById('authors-added');

  function addAuthorBlock(authorFirst, authorLast) {
    function newEl(el) {
      return document.createElement(el);
    }
    var newGrid = newEl("div");
    var leftCol = newEl("div");
    var rightCol = newEl("div");
    var inputFirst = newEl("input");
    var inputLast = newEl("input");

    inputFirst.setAttribute("value", authorFirst);
    inputFirst.setAttribute("name", "authorsFirst");
    inputFirst.className = "mdl-textfield__input";

    inputLast.setAttribute("value", authorLast);
    inputLast.setAttribute("name", "authorsLast");
    inputLast.className = "mdl-textfield__input";

    newGrid.className = "mdl-grid";
    leftCol.className = "mdl-cell mdl-cell--10-col mdl-cell--7-col-tablet mdl-cell--3-col-phone";
    rightCol.className = "mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone";

    rightCol.innerHTML = "<a href=''><i class='material-icons remove-author'>clear</i></a>";
    leftCol.appendChild(inputFirst);
    leftCol.appendChild(inputLast);
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
    console.log('adding authors');

    if (authorsFirstInput.value === '' || authorsFirstInput.value === null) {
      authorsFirstInput.parentNode.classList.add('is-invalid');
    }
    else {
      addAuthorBlock(authorsFirstInput.value, authorsLastInput.value);
      authorsFirstInput.value = '';
      authorsLastInput.value = '';
    }
  });
})();
