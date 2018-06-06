import actionTypes from '../constants/actionTypes'

let initialState = {
    books: [],
    book: {}
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case actionTypes.BOOKS_RECEIVED:
            updated['books'] = action.books;
            updated['count'] = action.count;
            updated['currentPage'] = action.currentPage;
            return updated;

        case actionTypes.BOOK_RECEIVED:
            updated['book'] = action.book;
            return updated;

        default:
            return state;
    }
}