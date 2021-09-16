import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export const AuthenticRoute = ({component:Component, ...rest})=> {

    const isAuthenticated = useSelector(state => !!state.auth.accessToken)
   
    return (
      <Route {...rest} component={props =>(
          isAuthenticated ? ( <Component  />) : (<Redirect to="/login" />)
      )}  />
    )
}

export const IsAdminRoute = ({component:Component, ...rest})=> {

  const isAuthenticated = useSelector(state => state.auth.accessToken)
    const is_superUser = useSelector(state => state.auth.is_superUser)
    console.log(is_superUser);
    
    return (
      <Route {...rest} component={props =>(
        is_superUser==="true" ? ( <Component  />) : (<Redirect to="/" />)
      )}  />
    )
}


export const LogedInRoute = ({component:Component, ...rest})=> {
    const isAuthenticated = localStorage.getItem('access_token')
    return (
      <Route {...rest} component={props =>(
          isAuthenticated ? (<Redirect to="/" />) : ( <Component  />) 
      )}  />
    )
}

 