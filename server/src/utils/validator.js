
module.exports = {
    /*
     * Validate payload
     */
    validate(meta, data) {
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
        }

        return errors;
    },

    /*
     * Field validation
     */
    isValidField: function(fieldDef, value) {
        value = (value && fieldDef.type == 'string') ? value.trim() : value;

        // Check for required
        if (fieldDef.required && !value) {
            return fieldDef.label + ' is mandatory. Please fill out this field.'
        }

        // Regular expression validation
        if (value && fieldDef.pattern) {
            let pattern = new RegExp(fieldDef.pattern);
            if (!pattern.test(value)) {
                let message = fieldDef.label + ' ' + (fieldDef.errorMessage ? fieldDef.errorMessage : 'is invalid');
                return message;
            }
        }

        // Length validation
        if (value && fieldDef.length) {
            let valueLength = value.length;
            let message = '';

            if (typeof fieldDef.length == 'number') {
                if (valueLength != fieldDef.length) {
                    message = fieldDef.label + ' should be length of ' + fieldDef.length + ' characters.';
                    return message;
                }
            } else {
                let lengthDef = fieldDef.length.slice();
                if (valueLength < lengthDef[0] || valueLength > lengthDef[1]) {
                    message = fieldDef.label + ' should have length between ' + fieldDef.length.join('-') + ' characters.';
                    return message;
                }
            }
        }

        // Timestamp validation
        if (value && fieldDef.type == 'timestamp' && !(/^-?\d+$/.test(value))) {
            return fieldDef.label + ' should be a valid date.';
        }

        return true;
    }


};
