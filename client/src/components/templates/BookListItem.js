import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookListItem extends Component {
    render() {
        return (
            <Link to={`/books/${this.props.data.uid}`} className="list-group-item">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-2 d-none d-sm-block fa-3x list-icon">
                        <i className="fa fa-book"></i>
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-10 col-xs-12">
                        <h5 className="list-group-item-heading list-heading">{this.props.data.title}</h5>
                        <p className="list-group-item-text list-sub-heading">{'by ' + this.props.data.author}</p>
                        <p className="list-description">{'ISBN: ' + this.props.data.isbn + ' - first published in ' + this.props.data.first_published_year}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

BookListItem.propTypes = {
    data: PropTypes.shape({
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

export default BookListItem;