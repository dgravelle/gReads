(function(){
  var addBookForm = document.getElementById('add-book__form');
  var authorsFirstInput = document.getElementById('authorsFirstInput');
  var authorsLastInput = document.getElementById('authorsLastInput');
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
