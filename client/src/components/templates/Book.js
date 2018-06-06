import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchBook, createBook, updateBook, deleteBook } from '../../actions/bookActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import bookMeta from '../../../../common/models/book.yml';
import Input from '../form/Input';
import AuthenticatedComponent from './AuthenticatedComponent';
import Validator from '../../util/validator';
import Utility from '../../util/utility';
import Alert from '../notification/Alert';

class Book extends AuthenticatedComponent {
    constructor(props) {
        super(props);

        this.errors = [];
        this.isNew = this.props.match.params.id == 'new';

        // alert
        this.alert = React.createRef();

        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
    };

    componentDidMount() {
        this.props.dispatch(fetchBook(this.props.match.params.id, bookMeta));
    }

    /*
     * Save data
     */
    save() {
        // Validation
        this.errors = [];
        let isValid = Validator.isValidModel(bookMeta, this.props.book);
        if (isValid !== true) {
            this.errors = isValid;
            this.forceUpdateHandler();
            return;
        }

        // Create new book
        if (this.isNew) {
            this.props.dispatch(createBook(this.props.book)).then((data) => {
                let alertType = !data.error ? 'success' : 'danger';
                if (typeof data.message == 'object') {
                    data.message = data.message.join(", ");
                }
                this.alert.current.showAlert(alertType, data.message).then(timeout => {
                    if (data.error) {
                        return;
                    }
                    Utility.interval(() => {
                        return this.props.history.push('/books');
                    }, timeout);
                });
            });
            return;
        }

        // Update book
        this.props.dispatch(updateBook(this.props.match.params.id, this.props.book)).then((data) => {
            let alertType = !data.error ? 'success' : 'danger';
            if (typeof data.message == 'object') {
                data.message = data.message.join(", ");
            }
            this.alert.current.showAlert(alertType, data.message).then(timeout => {
                if (data.error) {
                    return;
                }
                Utility.interval(() => {
                    return this.props.history.push('/books');
                }, timeout);
            });
        });
    }

    /*
     * Delete book on the server
     */
    delete() {
        this.props.dispatch(deleteBook(this.props.match.params.id)).then((data) => {
            let alertType = !data.error ? 'success' : 'danger';
            this.alert.current.showAlert(alertType, data.message).then(timeout => {
                if (data.error) {
                    return;
                }
                Utility.interval(() => {
                    return this.props.history.push('/books');
                }, timeout);
            });
        });
    }

    /* 
     * This method will be sent to the child component
     */
    stateHandler(fieldName, value) {
        // update errors
        if (this.errors) {
            let index = this.errors.length - 1;
            while (index >= 0) {
                let error = this.errors[index];
                if (error.fieldName == fieldName) {
                    this.errors.splice(index, 1);
                }
                index--;
            }
        }
        this.props.book[fieldName] = value;
        this.forceUpdateHandler();
    }

    forceUpdateHandler() {
        this.forceUpdate();
    };

    render() {
        return (
            <div className="col-sm-12">
                <Alert ref={this.alert} />
                <div className="title-bar">
                    <span className="page-title">
                        <Link to={`/books`}>Books</Link>&nbsp;&raquo;&nbsp; {this.props.book.title}
                    </span>
                </div>

                <div className="col-sm-12">
                    <form className="form-ui">
                        <Input meta={bookMeta} data={this.props.book.title} fieldName="title" controlFunc={this.stateHandler} errors={this.errors} />
                        <Input meta={bookMeta} data={this.props.book.author} fieldName="author" controlFunc={this.stateHandler} errors={this.errors} />
                        <Input meta={bookMeta} data={this.props.book.isbn} fieldName="isbn" controlFunc={this.stateHandler} errors={this.errors} />
                        <Input meta={bookMeta} data={this.props.book.first_published_year} fieldName="first_published_year" controlFunc={this.stateHandler} errors={this.errors} />
                        <Input meta={bookMeta} data={this.props.book.publisher} fieldName="publisher" controlFunc={this.stateHandler} errors={this.errors} />
                        <Input meta={bookMeta} data={this.props.book.book_type} fieldName="book_type" controlFunc={this.stateHandler} errors={this.errors} />
                    </form>
                </div>

                <div className="col-sm-12">
                    <div className="btn-toolbar pull-right" role="toolbar">
                        <div className="btn-group mr-2" role="group">
                            { !this.isNew ?
                                <a className="btn btn-danger btn-red" role="button" onClick={this.delete}><i className="fa fa-times"></i>Delete</a>
                            : ''}
                        </div>
                        <div className="btn-group mr-2" role="group">
                            <a className="btn btn-primary btn-blue" role="button" onClick={this.save}><i className="fa fa-save"></i>Save</a>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        isbn: PropTypes.string.isRequired,
        first_published_year: PropTypes.string.isRequired,
        publisher: PropTypes.string,
        book_type: PropTypes.string
    })
};

const mapStateToProps = state => {
    return {
        book: state.books.book
    }
}

export default connect(mapStateToProps)(Book);