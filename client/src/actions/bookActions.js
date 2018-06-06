import actionTypes from '../constants/actionTypes';
import Utility from '../util/utility';
import network from '../resources/network';
import conf from '../conf.yml';

export function fetchBooks(page) {
    let url = '/books';
    if (page) {
        url += '?page=' + page;
    }
    return dispatch => {
        return network.request(url, 'GET')
            .then( (response) => dispatch({
                type: actionTypes.BOOKS_RECEIVED,
                books: response.data.data,
                count: response.data.count,
                currentPage: response.data.currentPage
            }))
            .catch( (e) => console.log(e) );
    }
}

export function fetchBook(id, meta = null) {
    if (id == 'new') {
        let newBook = Utility.createNewModal(meta);
        return dispatch => {
            dispatch({
                type: actionTypes.BOOK_RECEIVED,
                book: newBook
            });
        }
    }

    let path = `/books/${id}`;

    return dispatch => {
        return network.request(path, 'GET')
            .then( (response) => dispatch({
                type: actionTypes.BOOK_RECEIVED,
                book: response.data
            }))
            .catch( (e) => console.log(e) );
    }
}

export function createBook(data) {
    return dispatch => {
        return network.request('/books', 'POST', data);
    }
}

export function updateBook(id, data) {
    let path = `/books/${id}`;

    return dispatch => {
        return network.request(path, 'PUT', data);
    }
}

export function deleteBook(id) {
    let path = `/books/${id}`;

    return dispatch => {
        return network.request(path, 'DELETE');
    }
}