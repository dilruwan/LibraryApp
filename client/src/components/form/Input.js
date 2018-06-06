/**
 * Input Component
 * Note: Only support for text / number / password types
 *
 * Ussage Example:
 * import Input from './Input.js';
 * ...
 *  <Input meta={bookMeta} data={this.props.book.title} fieldName="tilte" controlFunc={this.stateHandler} />
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from '../../util/validator';

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.label = '';
        this.requiredText = '';
        this.placeholder = '';
        this.errorMessage = '';
        this.fieldDef = {};
        this.fieldType = '';

        this.updateState = this.updateState.bind(this);
    };

    componentWillMount() {
        let fieldDef = this.props.meta.fields[this.props.fieldName];
        this.fieldDef = fieldDef;
        this.label = fieldDef.label;
        this.requiredText = fieldDef.required ? '*' : '';
        this.placeholder = fieldDef.placeholder ? fieldDef.placeholder : '';
        switch (this.fieldDef.type) {
            case 'password':
                this.fieldType = 'password';
                break;
            case 'int':
                this.fieldType = 'number';
                break;
            default:
                this.fieldType = 'text';
                break;
        }
    }

    componentWillReceiveProps(props) {
        if (!props.errors) {
            return;
        }

        for (let index in props.errors) {
            let error = props.errors[index];
            if (error.fieldName == this.props.fieldName) {
                this.errorMessage = error.errorMessage;
                return;
            }
        }
    }

    /*
     * Update parent state when changing value
     */
    updateState(e) {
        let value = e.target.value;
        // update parent model
        this.props.controlFunc(this.props.fieldName, value);

        let isValid = Validator.isValidField(this.fieldDef, value);
        if (isValid === true) {
            this.errorMessage = '';
            return;
        }
        this.errorMessage = isValid.errorMessage;
    }

    render() {
        return (
            <div className="form-group row">
                <label htmlFor={this.props.fieldName} className="col-sm-3 col-form-label">{this.label}<span className="required-label">{this.requiredText}</span></label>
                <div className="col-sm-9">
                    <input type={this.fieldType} className="form-control" id={this.props.fieldName} value={this.props.data} onChange={this.updateState} placeholder={this.placeholder}/>
                    <small className="form-text input-error-message">{this.errorMessage}</small>
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    meta: PropTypes.object.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    fieldName: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired
};

export default Input;