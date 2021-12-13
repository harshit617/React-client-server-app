import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './Home';

import Login from './Login';

import Signup from './Signup';

import Welcome from './Welcome';

import Information from './Information';

import AllUsers from './AllUsers';

import Error from './Error';

import ProtectedRoute from './ProtectedRoute';

class Main extends Component {

    constructor() {
        super();
        this.state = {
            isAuth:false
        }
        
    }

    componentDidMount() {
        localStorage.removeItem('auth');
        localStorage.removeItem('id');
        localStorage.setItem('isAuth', false);
        const isAuth = localStorage.getItem('isAuth');
        this.setState({isAuth:isAuth});
        

    }

    handleisAuth(isAuth){
        this.setState({isAuth:isAuth});
    }

    render() {
        return <div>
            <Switch>
            <Route exact path="/" render={({ history }) => {
                return <div>
                    <Home  /></div>
            }} />

            <Route path="/login" render={({ history }) => {
                return <div>
                    <Login  history={history}  />
                </div>
            }} />

            <Route path="/signup" render={({ history }) => {
                return <div>
                    <Signup history={history} />
                </div>
            }} />

           
            
         
            <Route path="/error" render={({ history }) => {
                return <div>
                    <Error  />
                </div>
            }} />
           

            <Route path="/logout" render={({ history }) => {
                return <div>
                    <Home  />
                </div>
            }} />
            <Route path="/allusers" render={({ history }) => {
                return <div>
                    <AllUsers  />
                </div>
            }} />
            <ProtectedRoute path="/LoggedIn" component={Welcome} /> 
             <ProtectedRoute path="/updateuser" component={Information} > 
              
              </ProtectedRoute> 
              <Route component={Error}/>
              
              </Switch>
        </div>
    }
}

export default Main;