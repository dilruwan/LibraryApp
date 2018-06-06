import React, {Component} from 'react';
import { Route, HashRouter } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import Home from './components/templates/Home';
import Books from './components/templates/Books';
import Book from './components/templates/Book';
import Login from './components/templates/Login';

import { Provider } from 'react-redux';
import store from './store/store';
import Auth from './session/auth';

class App extends Component {
    /*
     * Load jwt token when loading application
     */
    componentWillMount() {
        Auth.checkAuth();
    }

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Layout>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/books" component={Books} />
                        <Route path="/books/:id" component={Book}/>
                        <Route path="/login" component={Login}/>
                    </Layout>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;