(function(){
  var addBookForm = document.getElementById('add-book__form');
  var authorsFirstInput = document.getElementById('authorsFirstInput');
  var authorsLastInput = document.getElementById('authorsLastInput');
  var title = document.getElementById('title');
  var genre = document.getElementById('genre');
  var coverImage = document.getElementById('coverImage');
  var description = document.getElementById('description');
  var bookSubmitBtn = document.getElementById('bookSubmitBtn');
  // var bookTitles = document.querySelector('name=bookTitle');

  var addBookInputs = addBookForm.querySelectorAll('textarea, input:not([id*="author"])');

  function isFormComplete(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        return bookSubmitBtn.setAttribute('disabled','true');
      }
    }
    return bookSubmitBtn.removeAttribute('disabled');;
  }

  isFormComplete(addBookInputs);

  title.addEventListener('blur', function() {
    if(title.value === '' || title.value === null) {
      title.parentElement.classList.add('is-invalid');
    }
    isFormComplete(addBookInputs);
  });

  genre.addEventListener('blur', function() {
    if(this.value === '' || this.value === null) {
      this.parentElement.classList.add('is-invalid');
    }
    isFormComplete(addBookInputs);
  });

  coverImage.addEventListener('blur', function() {
    var regUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
    if (!regUrl.test(this.value)) {
      this.parentElement.classList.add('is-invalid');
    }
    isFormComplete(addBookInputs);
  });

  description.addEventListener('blur', function() {
    if(description.value === '' || description.value === null) {
      this.parentElement.classList.add('is-invalid');
    }
    isFormComplete(addBookInputs);
  });

  authorsFirstInput.addEventListener('blur', function() {
    if (this.value === '' && document.querySelector('input[name=authors]') === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });

  authorsLastInput.addEventListener('blur', function() {
    if (this.value === '' && document.querySelector('input[name=authors]') === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });

  addBookForm.addEventListener('submit', function() {
    if (document.querySelector('input[name=authors]') === null) {
      this.parentElement.classList.add('is-invalid');
    }
  });
})();
