/**
 * This module handle form validations
 */
export default {
    /*
     * Check data for any errors
     * Return boolean true unless found any error, else return array of errors
     */
    isValidModel: function(meta, data) {
        let errorStatus = false; // if any error found status change to true
        let errors = [];

        // Iterate through all the fields & Checking
        // required fields
        // pattern match with regular expression
        // length etc.
        for (let fieldName in meta.fields) {
            // field defined in the meta data
            let fieldDef = meta.fields[fieldName];
            // value for corresponding field
            let value = data[fieldName];

            // skip if it is a system generating fields
            if (fieldDef.system) {
                continue;
            }

            name = fieldDef.label;

            let isValid = this.isValidField(fieldDef, value);
            if (isValid === true) {
                continue;
            }
            
            errors.push(isValid);
            errorStatus = true;
        }

        return errorStatus ? errors : true;
    },

    /*
     * Check data for any errors for given field
     * Return boolean true unless found any error, else return error string
     * Error format
     * {
     *      fieldName: 'firstName',
     *      errorMessage: 'First Name should have length between 1 to 100'
     * }
     */
    isValidField: function(fieldDef, value) {
        value = (value && fieldDef.type == 'string') ? value.trim() : value;

        // Check for required
        if (fieldDef.required && !value) {
            return {
                fieldName: fieldDef.name,
                errorMessage: fieldDef.label + ' is mandatory. Please fill out this field.'
            }
        }

        // Regular expression validation
        if (value && fieldDef.pattern) {
            let pattern = new RegExp(fieldDef.pattern);
            if (!pattern.test(value)) {
                let message = fieldDef.label + ' ' + (fieldDef.errorMessage ? fieldDef.errorMessage : 'is invalid');
                return {
                    fieldName: fieldDef.name,
                    errorMessage: message
                }
            }
        }

        // Length validation
        if (value && fieldDef.length) {
            let valueLength = value.length;
            let message = '';

            if (typeof fieldDef.length == 'number') {
                if (valueLength != fieldDef.length) {
                    message = fieldDef.label + ' should be length of ' + fieldDef.length + ' characters.';
                    return {
                        fieldName: fieldDef.name,
                        errorMessage: message
                    }
                }
            } else {
                let lengthDef = fieldDef.length.slice();
                if (valueLength < lengthDef[0] || valueLength > lengthDef[1]) {
                    message = fieldDef.label + ' should have length between ' + fieldDef.length.join('-') + ' characters.';
                    return {
                        fieldName: fieldDef.name,
                        errorMessage: message
                    }
                }
            }
        }

        // Timestamp validation
        if (value && fieldDef.type == 'timestamp' && !(/^-?\d+$/.test(value))) {
            return {
                fieldName: fieldDef.name,
                errorMessage: fieldDef.label + ' should be a valid date.'
            }
        }

        return true;
    }
}