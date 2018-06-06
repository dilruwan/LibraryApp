import conf from '../conf.yml';
import Auth from '../session/auth';

export default {
    /*
     * This can be commonly used for handle server requests
     * 
     * @Params
     * path = "/books"
     * requestType = "POST"
     * data = {
     *     title: 'Sample title',
     *     authour: 'T.L. Silva'
     * }
     */
    request: function(path, requestType, data = {}) {
        let url = conf.server.host + path;
        let options = {
            method: requestType,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Auth.getAuthToken()
            },
            mode: 'cors'
        };

        if (!(requestType == 'GET' || requestType == 'DELETE')) {
            options.body = JSON.stringify(data);
        }

        return fetch(url, options)
            .then(response => response.json())
            .catch( (e) => console.log(e) );
    }
}