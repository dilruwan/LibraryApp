import PropTypes from 'prop-types';

/**
 * Paginator Component
 *
 * Ussage Example:
 */
import React, { Component } from 'react';

class Paginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPagination: false,
            itemsPerPage: 10,
            maxPagesPerSet: 5,
            startPage: 1,
            endPage: 4,
            lastPage: 0,
            showFirst: false,
            showPrevious: false,
            showNext: false,
            showLast: false,
            currentPage: 1
        }

        this.click = this.click.bind(this);
        this.initialize = this.initialize.bind(this);
    };

    componentWillMount() {
        this.initialize(this.props.currentPage);
    }

    componentWillReceiveProps(newProps) {
        this.initialize(newProps.currentPage);
    }

    click(page) {
        this.props.paginate(page);
    }

    initialize(currentPage) {
        currentPage = parseInt(currentPage);
        this.setState({currentPage: currentPage});

        if (!this.props.count || this.props.count == 0) {
            this.setState({showPagination: false});
            return;
        }

        const lastPage = Math.ceil(this.props.count / this.state.itemsPerPage);
        const isFirstPageSelected = currentPage == 1;
        const isLastPageSelected = currentPage == lastPage;

        if (lastPage <= this.state.maxPagesPerSet) {
            this.setState({startPage: 1});
            this.setState({endPage: lastPage});
        } else if (currentPage == lastPage || currentPage == lastPage - 1) {
            this.setState({startPage: lastPage - this.state.maxPagesPerSet + 1});
            this.setState({endPage: lastPage});
        } else if (currentPage - 2 >= 1 && currentPage + 2 <= lastPage) {
            this.setState({startPage: currentPage - 2});
            this.setState({endPage: currentPage + 2});
        } else if (currentPage == 1 || currentPage == 2) {
            this.setState({startPage: 1});
            this.setState({endPage: this.state.maxPagesPerSet});
        }

        this.setState({lastPage: lastPage});

        this.setState({showFirst: !isFirstPageSelected});
        this.setState({showPrevious: !isFirstPageSelected});
        
        this.setState({showNext: !isLastPageSelected});
        this.setState({showLast: !isLastPageSelected});

        this.setState({showPagination: true});
    }

    render() {
        const pageList = [];
        for (let i = this.state.startPage; i <= this.state.endPage; i++) {
            let link = <li className={i == this.state.currentPage ? 'page-item active' : 'page-item'} key={i}>
                { i != this.state.currentPage ? <a className="page-link" onClick={this.click.bind(null, i)}>{i}</a>
                : <a className="page-link">{i}</a> }
            </li>;
            pageList.push(link);
        }

        return (
            <div className="pull-right">
                <nav>
                    { this.state.showPagination ?
                    <ul className="pagination">
                        { this.state.showFirst ?
                        <li className="page-item">
                            <a className="page-link" onClick={this.click.bind(null, 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">First</span>
                            </a>
                        </li>
                        : '' }
                        { this.state.showPrevious ?
                        <li className="page-item">
                            <a className="page-link" onClick={this.click.bind(null, this.state.currentPage - 1)} aria-label="Previous">
                                <span aria-hidden="true">&lsaquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        : '' }
                        {pageList}
                        { this.state.showNext ?
                        <li className="page-item">
                            <a className="page-link" onClick={this.click.bind(null, this.state.currentPage + 1)} aria-label="Next">
                                <span aria-hidden="true">&rsaquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                        : '' }
                        { this.state.showLast ?
                        <li className="page-item">
                            <a className="page-link" onClick={this.click.bind(null, this.state.lastPage)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Last</span>
                            </a>
                        </li>
                        : '' }
                    </ul>
                    : ''}
                </nav>
            </div>
        );
    }
}

Paginator.propTypes = {
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired
};

export default Paginator;