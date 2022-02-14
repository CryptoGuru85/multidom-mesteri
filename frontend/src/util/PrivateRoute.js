import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest} component={(props) => {
            if(rest.isAuthenticated){
                return <Component {...props}/>
            }else{
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }    
        }}
    />
)

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
})

export default connect(mapStateToProps)(PrivateRoute);

/*
import IsAuth from './IsAuth';


const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            IsAuth ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};



export default PrivateRoute;*/