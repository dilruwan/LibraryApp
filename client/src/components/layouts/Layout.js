import React, { Component } from 'react';
import Header from '../navigation/Header';
 
class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                
                <div className="container page-content">
                    <div className="row">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;