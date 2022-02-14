import React, {useEffect} from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';

import store from './store';
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';

import PrivateRoute from './util/PrivateRoute';
import PublicRoute from './util/PublicRoute';

import Header from './components/Header';
import Header2 from './components/Header2';
import Home from './pages/Home';
import ProfileDetails from './components/profile/ProfileDetails';

const theme = createTheme({
    palette:{
        primary:{
            light: '#FFFFFF',
            main: '#FFFFFF',
            dark: '#0081cb',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#2B2322',
            dark: '#b22a00',
            contrastText: '#fff'
        },
        background:{
            paper: '#FFFFFF'
        }
    }
})

const App = () =>{

    useEffect(() => {
        store.dispatch(loadUser());
    }, [store])


    return(
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Header2>
                    <Switch>
                        <Route exact  path="/" component={Home}/>
                        <Route exact  path="/profile/:id" component={ProfileDetails}/>
                    </Switch>
                    </Header2>
                </Router>
            </MuiThemeProvider>
        </Provider>
    )
}

export default App;

render(<App />, document.getElementById("app"));