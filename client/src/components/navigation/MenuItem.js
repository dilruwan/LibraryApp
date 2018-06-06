import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class MenuItem extends Component {
    constructor(props) {
        super(props);
        
        this.selectMenuItem = this.selectMenuItem.bind(this);
    };

    selectMenuItem() {
        this.props.selectMenuItem(this.props.id, this.props.href);
    };

    render() {
        return (
            <li className={this.props.activeMenu == this.props.id ? "nav-item active" : "nav-item"} onClick={this.selectMenuItem}>
                <Link to={this.props.href} className="nav-link">{this.props.title}</Link>
            </li>
        );
    }
}

export default MenuItem;