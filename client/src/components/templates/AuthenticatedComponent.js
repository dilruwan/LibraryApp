import React, {Component} from 'react';
import Auth from '../../session/auth';

class AuthenticatedComponent extends Component {
    /*
     * Return to login, if auauthorized
     */
    componentWillMount() {
        if (!Auth.authenticated) {
            return this.props.history.push('/login');
        }
    }
}

export default AuthenticatedComponent;