import React, { Component } from 'react';
import MenuItem from './MenuItem';
import DropdownMenuItem from './DropdownMenuItem';
import { Link } from 'react-router-dom';
import Auth from '../../session/auth';
 
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didNavbarExpand: false,
            activeMenu: 'home'
        };
        
        this.toggleNavbarMenu = this.toggleNavbarMenu.bind(this);
        this.selectMenuItem = this.selectMenuItem.bind(this);
    };

    toggleNavbarMenu(e) {
        e.preventDefault();

        this.setState(prevState => ({
            didNavbarExpand: !prevState.didNavbarExpand
        }));
    };

    selectMenuItem(id, href, isClosing = true) {
        this.setState({ activeMenu: id });
        if (isClosing) {
            this.setState({ didNavbarExpand: false });
        }
    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Library System</a>
                <button className={this.state.didNavbarExpand ? "navbar-toggler collapsed" : "navbar-toggler"} onClick={this.toggleNavbarMenu} type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded={this.state.didNavbarExpand ? "true" : "false"} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={this.state.didNavbarExpand ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        { Auth.authenticated ? 
                        <MenuItem href="/books" title="Books" id="books" activeMenu={this.state.activeMenu} selectMenuItem={this.selectMenuItem} />
                        : '' }
                    </ul>
                    <ul className="navbar-nav">
                        { Auth.authenticated ? 
                        <DropdownMenuItem id="session" activeMenu={this.state.activeMenu} selectMenuItem={this.selectMenuItem} />
                        : 
                        <Link to={`/login`} className="btn btn-sm btn-primary btn-blue">Login</Link>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;