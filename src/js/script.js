{
  'use strict';

  const select = {
    templateOf: {
      bookTemp: '#template-book',
    },

    containerOf: {
      bookList: '.books-list',
      images: '.book__image',
    }
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.bookTemp).innerHTML),
  };

  const arrays = {
    favoriteBooks: [],
  };

  class BookList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    initData(){
      const thisBookList = this;

      thisBookList.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this;

      thisBookList.dom = {};

      thisBookList.dom.bookList = document.querySelector(select.containerOf.bookList);
    }

    render() {
      const thisBookList = this;

      for (let book of thisBookList.data) {
        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = thisBookList.dom.bookList;
        bookContainer.appendChild(generatedDOM);
      }
    }

    initActions(){
      const thisBookList = this;

      thisBookList.dom.bookList.addEventListener('dblclick', function(event){
        event.preventDefault();

        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id');

        if(!arrays.favoriteBooks.includes(bookId)){
          image.classList.add('favorite');
          arrays.favoriteBooks.push(bookId);
        } else {
          image.classList.remove('favorite');
          const indexOfBookId = arrays.favoriteBooks.indexOf(bookId);
          arrays.favoriteBooks.splice(indexOfBookId, 1);
        }
      });
    }
  }

  new BookList();
}