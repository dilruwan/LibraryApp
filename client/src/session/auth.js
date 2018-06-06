const SESSION_KEY = 'library-user-session'; // local-storage key

/**
 * This module handle the user session
 */
export default {
    SESSION_KEY: SESSION_KEY,
    authenticated: false, // Authentication status of the logged in user
    user: {}, // user session data
    
    createSession(session) {
        this.updateSession(session);
        // Store session in the local storage
        localStorage.setItem(SESSION_KEY, JSON.stringify(this.user));
        this.authenticated = true;
    },

    updateSession(session) {
        this.user.name     = (session && session.name)     ? session.name     : '';
        this.user.username = (session && session.username) ? session.username : '';
        this.user.token    = (session && session.token)    ? session.token    : '';
    },

    // Update session data by retrieve session from the localstorage
    checkAuth() {
        let sessionJson = localStorage.getItem(SESSION_KEY);
        let session = JSON.parse(sessionJson);
        if (session && session.token) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        this.updateSession(session);
    },

    // Return auth token
    getAuthToken() {
        return 'Bearer ' + (this.user && this.user.token ? this.user.token : '');
    },

    destroySession() {
        localStorage.removeItem(SESSION_KEY);
        this.authenticated = false;
        this.user = {};
    },
}