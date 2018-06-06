/**
 * Alert Component
 * Note: Only support for text type 
 *
 * Ussage Example:
 * import Alert from '../notification/Alert';
 * ...
 * this.alert = React.createRef();
 *
 * <Alert ref={this.alert} />
 *
 * this.alert.current.showAlert('success', 'Message');
 */

import React, { Component } from 'react';
import Utility from '../../util/utility';

class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            type: '',
            message: ''
        }

        this.autoHideTimer = null;

        this.closeAlert = this.closeAlert.bind(this);
        this.showAlert = this.showAlert.bind(this);
    };

    showAlert(type, message) {
        if (this.autoHideTimer != null) {
            clearTimeout(this.autoHideTimer);
        }

        this.setState({type: type});
        this.setState({message: message});
        this.setState({show: true});

        let timeout = 3000;
        let messageLength = this.state.message.length;
        if (messageLength >= 100) {
            timeout = messageLength * 50;
        }

        // close the alert in seconds
        this.autoHideTimer = Utility.interval(() => {
            this.setState({show: false});
        }, timeout);

        return Promise.resolve(timeout);
    }

    closeAlert() {
        if (this.autoHideTimer != null) {
            clearTimeout(this.autoHideTimer);
        }
        this.setState({show: false});
        this.setState({type: ''});
        this.setState({message: ''});
    }

    render() {
        return (
            <div>
                { this.state.show ?
                <div className={'alert alert-dismissible alert-' + this.state.type} role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    { this.state.message }
                </div>
                : '' }
            </div>
        );
    }
}

export default Alert;