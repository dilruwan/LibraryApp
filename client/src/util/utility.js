/**
 * This module includes utility functions
 */
export default {
    /*
     * Create and return new model
     */
    createNewModal: function(meta) {
        let model = {};
        for (let fieldName in meta.fields) {
            // field defined in the meta data
            let fieldDef = meta.fields[fieldName];

            // id set as new
            if (fieldName == 'id' || fieldName == 'uid') {
                model[fieldName] = 'new';
                continue;
            }

            model[fieldName] = '';
        }
        return model;
    },
    /*
     * Interval function
     * default wait time is 1 second
     */
    interval: function(resolve, waitTime = 1000) {
        return setTimeout(() => {
            resolve();
        }, waitTime);
    }
}