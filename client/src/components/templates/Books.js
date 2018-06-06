import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/bookActions';
import BookListItem from './BookListItem';
import Paginator from '../pagination/Paginator';

class Books extends AuthenticatedComponent {
    constructor() {
        super();

        this.state = {}
        this.paginate = this.paginate.bind(this);
    }

    /*
     * This will be triggered when mount component
     */
    componentDidMount() {
        const queryParams = new URLSearchParams(this.props.location.search);
        const page = queryParams.get('page') || 1;

        this.setState({currentPage: page});
        this.props.dispatch(fetchBooks(page));
    }

    /*
     * This will be triggered when props change
     */
    componentWillReceiveProps(newProps) {
        const queryParams = new URLSearchParams(newProps.location.search);
        const page = queryParams.get('page') || 1;

        if (this.state.currentPage != page) {
            this.setState({currentPage: page});
            this.props.dispatch(fetchBooks(page));
        }
    }

    /*
     * This function has sent to the paginator
     * This will be triggered when change pagination
     * @params
     *     page = 2
     */
    paginate(page) {
        this.props.history.push({
            pathname: '/books',
            search: '?page=' + page
        });
    }

    render() {
        const bookList = this.props.books.map( (book, i) => {
            return (
                <BookListItem key={i} data={book} />
            );
        });

        return (
            <div className="col-sm-12">
                <div className="title-bar">
                    <span className="page-title">Books</span>
                    <a className="btn btn-sm btn-primary pull-right" href="#/books/new" role="button"><i className="fa fa-plus"></i>Add Book</a>
                </div>

                {(this.props.books.length > 0) ? 
                    <div className="bootcards-list">
                        <div className="panel panel-default">
                            <div className="list-group">
                                {bookList}
                            </div>
                        </div>
                        <Paginator count={this.props.count} currentPage={this.props.currentPage} paginate={this.paginate} />
                    </div>
                : <div className="no-item-text">No books available</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.books.books,
        count: state.books.count,
        currentPage: state.books.currentPage
    }
}

export default connect(mapStateToProps)(Books);