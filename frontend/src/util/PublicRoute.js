import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


const PublicRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest} component={(props) => {
            if(!rest.isAuthenticated){
                return <Component {...props}/>
            }else{
                if(rest.location.state){
                    return <Redirect to={rest.location.state.from.pathname}/>
                }else{
                    return <Redirect to='/'/>
                }
            }    
        }}
    />
)

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PublicRoute);