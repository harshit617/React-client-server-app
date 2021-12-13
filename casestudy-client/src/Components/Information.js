import React, {Component} from 'react';
import '../styles/form.css';

class Infomration extends Component {
    constructor() {
        super();
        this.state = {
            loggedinUser:{},
            id:Number,
            
       
        }
       this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
       this.handleDelete = this.handleDelete.bind(this);
 
    }

    componentDidMount() {
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
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
                 loggedinUser:resp.user,
                id:resp.user.id
                }))
            })
})
        .catch(err => {
            console.log(err);
            alert('Invalid User')
        })
    }
    handleChange(event){
        console.log(event.target.value);
        this.setState({
            value: event.target.value})
    }
    handleUpdate(event) {
        event.preventDefault();
        
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
        fetch(`http://localhost:8000/auth/update/${id}`, {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                Authorization:'Bearer '+JSON.parse(token)
            },
            body:JSON.stringify(this.state.loggedinUser)
        }).then((result)=>{
            result.json()
            .then((resp)=>{
              
            
                console.log(resp);
                alert('User Details updated Login again to see changes');
            
                localStorage.removeItem('auth');
                localStorage.removeItem('userId');
                localStorage.setItem('isAuth', false);
               return this.props.history.push('/login');
                
            })

        })
        .catch(err => {
            console.log(err);
            alert('Invalid User')
        })
    }
       
        
    

    handleDelete(){
        
        
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
        fetch(`http://localhost:8000/auth/delete/${id}`, {
            method:"DELETE",
            headers:{
                Authorization:'Bearer '+JSON.parse(token)
            },
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                alert('user deleted');
                localStorage.removeItem('auth');
                localStorage.removeItem('id');
                localStorage.setItem('isAuth', false);
                this.props.history.push('/');
            })

        })
        .catch(err => {
            console.log(err);
            alert('Invalid User')
        })
    }
     

    
    
   
    render() {
        return <div className="main-container">
            
            <form className="login-form"> 
            <input  type="text" placeholder="Email" name="email" defaultValue={this.state.loggedinUser && this.state.loggedinUser.email}   disabled="disabled" required/>
            <input  type="text" placeholder="Username" name="username"defaultValue={this.state.loggedinUser && this.state.loggedinUser.username}  onChange={(e) => this.setState((state) => {this.state.loggedinUser.username = e.target.value})} required/>
            <input  type="text" placeholder="About Yourself" name="description" defaultValue={this.state.loggedinUser && this.state.loggedinUser.description}  onChange={(e) => this.setState((state) => {this.state.loggedinUser.description = e.target.value})} required/>
            <button className="button1" onClick={this.handleUpdate} > Update </button>
            <button className="button1" onClick={this.handleDelete} > Delete </button>
           
        </form>
      
        
        
        
        </div>
    }
    }

export default Infomration;