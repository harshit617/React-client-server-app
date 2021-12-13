import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main.css';
import Sidebar from './Sidebar';

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            loggedinUser: {},
            update: false,
            userss: [],
            id: Number,
            username:'',
            description:"",
            error:""
        }
        this.handleBtn = this.handleBtn.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    
    
    
        componentDidMount() {
           
              
            
            let url = window.location.href;
            let id = Number(url.split("/")[4]);
            let token = localStorage.getItem('auth');
            console.log(JSON.parse(token));
            fetch(`http://localhost:8000/auth/check/${id}`, {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:'Bearer '+JSON.parse(token)
                }
            }).then((result)=>{
                result.json().then((resp)=>{
                    console.log(resp);
                  
                    this.setState((state) => ({
                      username:resp.user.username,
                         id:resp.user.id,
                         description:resp.user.description
                    }))
                    
                })
               
            })
            .catch(err => {
                console.log(err);
                this.setState((state) => ({
                    error:err,
                    
                   }))
                alert('Invalid User')
            })
       
        }
        handleBtn() {
            this.setState(state => ({
                update: true
            }))
            console.log(this.state.loggedinUser);
        }

        handleLogout(){
            localStorage.removeItem('auth');
            localStorage.removeItem('authenticated');
            localStorage.removeItem('id');
            localStorage.setItem('isAuth', false);
            console.log(localStorage);
        }
    
    
        render() {
            return <div>
       
                <Sidebar id={this.state.id} />
                <h1> Hi , {this.state.username}</h1>
                <h3>About Yourself: {this.state.description}</h3>

                
                
    
            </div>
    
        }
    }
    
    export default Welcome;

