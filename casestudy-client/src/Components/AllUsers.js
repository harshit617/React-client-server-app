import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/users.css'
import {Popover } from '@material-ui/core';

class AllUsers extends Component {
    constructor() {
        super();
        this.state = {
            users:[],
            pop:false,
            singleuser:{},
            filteredUsers:[]
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
        componentDidMount() {
           
            fetch('http://localhost:8000/auth/fetchall/', {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    
                }
            }).then((result)=>{
                result.json().then((resp)=>{
                   
                    this.setState((state) => ({
                      users:resp.users,
                      filteredUsers:resp.users
                      
                    }))
                })
    
            })
            .catch(err => {
                console.log(err);
                alert('Invalid')
            })
        }
        handleSearch(event){
            event.preventDefault();
            let str = event.target.value;
            this.setState({
                filteredUsers: this.state.users.filter((user) => user.username.toLowerCase().includes(str.toLowerCase()))
            })
        }
        handleClick(id){
            let u = this.state.users.filter((user) => user.id === id)
            console.log(u);
            this.setState((state) => ({
                pop:true,
                singleuser:u[0]
             
               }))

        }

        handleHide(){
            this.setState((state) => ({
                pop:false
               }))
        }
        
    render () {
        return <div>
            <h1>ALL Users</h1>
            <table>
                <thead>
                    <th>Username</th>
                </thead>
                <tbody>
                <input className="search-input" type="text" name="search" placeholder="Search using fullname..." onChange={this.handleSearch}></input>

                {this.state.filteredUsers.map((user, index) => <tr key={index}>
                {/* <td>{user.username} </td> */}
                    <td  onClick = {() => {
                        this.handleClick(user.id);
                    }}>{user.username} </td>

                  <Popover   open={Boolean(this.state.pop) } 
                 anchorPosition = {{left: 1000, top: 5000}}
                  >
                      Username : {this.state.singleuser.username}<br></br><br></br>
                      Email : {this.state.singleuser.email} <br></br><br></br>
                      DOB : {this.state.singleuser.dob} <br></br><br></br>
                      About : {this.state.singleuser.description} <br></br><br></br>
                      <button onClick={this.handleHide}>OK</button>
                  
                  </Popover>
                </tr>)}
                </tbody>
            </table>
           <Link to="/"> <button className="button1">Go to home</button></Link>
        </div>
    }
}

export default AllUsers;