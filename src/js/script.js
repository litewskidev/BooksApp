{
  'use strict';

  const select = {
    templateOf: {
      bookTemp: '#template-book',
    },

    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
      images: '.book__image',
    }
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.bookTemp).innerHTML),
  };

  const arrays = {
    favoriteBooks: [],
    filters: [],
  };

  class BookList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    initData() {
      const thisBookList = this;

      thisBookList.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this;

      thisBookList.dom = {};

      thisBookList.dom.bookList = document.querySelector(select.containerOf.bookList);
      thisBookList.dom.filter = document.querySelector(select.containerOf.filters);
    }

    render() {
      const thisBookList = this;

      for (let book of thisBookList.data) {
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = thisBookList.dom.bookList;
        bookContainer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookList = this;

      //  FAVORITE
      thisBookList.dom.bookList.addEventListener('dblclick', function(event) {
        event.preventDefault();

        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id');

        if (!arrays.favoriteBooks.includes(bookId)) {
          image.classList.add('favorite');
          arrays.favoriteBooks.push(bookId);
        } else {
          image.classList.remove('favorite');
          const indexOfBookId = arrays.favoriteBooks.indexOf(bookId);
          arrays.favoriteBooks.splice(indexOfBookId, 1);
        }
      });

      //  FILTER
      thisBookList.dom.filter.addEventListener('click', function(event) {
        const clickedFilter = event.target;

        if (clickedFilter.tagName == 'INPUT' && clickedFilter.type == 'checkbox' && clickedFilter.name == 'filter') {
          if (clickedFilter.checked) {
            arrays.filters.push(clickedFilter.value);
          } else {
            const indexOfClickedFilter = arrays.filters.indexOf(clickedFilter.value);
            arrays.filters.splice(indexOfClickedFilter, 1);
          }
        }

        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;

      for (let book of thisBookList.data) {
        let shouldBeHidden = false;
        for (const filter of arrays.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        const hiddenBooks = document.querySelector(select.containerOf.images + '[data-id = "' + book.id + '"]');

        if (shouldBeHidden) {
          hiddenBooks.classList.add('hidden');
        } else {
          hiddenBooks.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';

      if (rating < 7) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 7 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    }
  }

  new BookList();
}