import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../session/auth';
import { withRouter } from "react-router-dom";
 
class DropdownMenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didDropdownExpand: false
        };
        
        this.selectMenuItem = this.selectMenuItem.bind(this);
        this.selectDropdownItem = this.selectDropdownItem.bind(this);
    };

    selectMenuItem(e) {
        e.preventDefault();

        this.setState(prevState => ({
            didDropdownExpand: !prevState.didDropdownExpand
        }));

        this.props.selectMenuItem(this.props.id, this.props.href, false);
    };

    selectDropdownItem(e) {
        e.preventDefault();
        
        this.props.selectMenuItem(this.props.id, this.props.href);

        // Logout
        Auth.destroySession();
        Auth.checkAuth();
        this.props.history.push('/login');
    };

    render() {
        return (
            <li className={this.props.activeMenu == this.props.id ? "nav-item dropdown active show" : "nav-item dropdown"} onClick={this.selectMenuItem}>
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded={this.state.didDropdownExpand ? "true" : "false"}>
                    { Auth.user.name }
                </a>
                <div className={this.state.didDropdownExpand ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu"} aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" onClick={this.selectDropdownItem}>Logout</a>
                </div>
            </li>
        );
    }
}

export default withRouter(DropdownMenuItem);