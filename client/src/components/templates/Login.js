import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchSession, createSession } from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import sessionMeta from '../../../../common/models/session.yml';
import Input from '../form/Input';
import Validator from '../../util/validator';
import Utility from '../../util/utility';
import Auth from '../../session/auth';
import Alert from '../notification/Alert';

class Session extends Component {
    constructor(props) {
        super(props);

        this.errors = [];

        // alert
        this.alert = React.createRef();

        this.save = this.save.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
    };

    componentDidMount() {
        this.props.dispatch(fetchSession(sessionMeta));
    }

    /*
     * Save data
     */
    save() {
        // Validation
        this.errors = [];
        let isValid = Validator.isValidModel(sessionMeta, this.props.session);
        if (isValid !== true) {
            this.errors = isValid;
            this.forceUpdateHandler();
            return;
        }

        // Create new session
        this.props.dispatch(createSession(this.props.session)).then((data) => {
            this.props.session.username = '';
            this.props.session.password = '';
            this.forceUpdateHandler();

            // Store token if login success
            if (!data.error) {
                Auth.createSession(data.data);
                return this.props.history.push('/books');
            }
            
            this.alert.current.showAlert('danger', data.message);
        });
        return;
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
        this.props.session[fieldName] = value;
        this.forceUpdateHandler();
    }

    forceUpdateHandler() {
        this.forceUpdate();
    };

    render() {
        return (
            <div className="col-sm-12">
                <Alert ref={this.alert} />
                <div className="col-lg-6 col-md-8 col-sm-12 mx-auto ml-auto">
                    <div className="col-sm-12 login-form">
                        <div className="title-bar">
                            <span className="page-title">
                                Please Login
                            </span>
                        </div>

                        <div className="col-sm-12">
                            <form className="form-ui">
                                <Input meta={sessionMeta} data={this.props.session.username} fieldName="username" controlFunc={this.stateHandler} errors={this.errors} />
                                <Input meta={sessionMeta} data={this.props.session.password} fieldName="password" controlFunc={this.stateHandler} errors={this.errors} />
                            </form>

                            <div className="btn-toolbar pull-right" role="toolbar">
                                <div className="btn-group mr-2" role="group">
                                    <a className="btn btn-primary btn-blue" role="button" onClick={this.save}><i className="fa fa-sign-in"></i>Sign in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Session.propTypes = {
    session: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    })
};

const mapStateToProps = state => {
    return {
        session: state.session.session
    }
}

export default connect(mapStateToProps)(Session);