import React, { Component} from "react";

import '../styles/form.css';

class Login extends Component {

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
       //this.errorDiv = this.errorDiv.bind(this);
        this.state = {
            error:"",
            display:1
        }
        
    }
    // errorDiv(err){
    //   // event.preventDefault();
    // //    let error= this.state.error;
    // //     console.log(error);
    // //     console.log(this.state.error);
    //      return  <h1>{err.Error}</h1>
       
        


    // componentDidMount(){
    //     console.log(this.state.error);
    // }
    handleLogin(event){
        event.preventDefault();
        fetch('http://localhost:8000/auth/login', {
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(this.state)
        }).then(async (result)=>{
            const resp = await result.json();
            console.log(resp.message);
            if(!resp.token) {
                 const error = resp.message
                console.log(error);
                 throw error;
              
            }
            console.log(resp.token);
            localStorage.setItem("auth", JSON.stringify(resp.token));
            localStorage.setItem("isAuth", "true");
            console.log(localStorage.getItem('isAuth'));
            localStorage.setItem("id", JSON.stringify(resp.id));
            return this.props.history.push('/LoggedIn/' + resp.id);

        })
        .catch((err) => {

            console.log(err);
            this.setState((state) => ({
                error:err,
                display:0
               }))
        
        })
    }
            

            
          
    

    render() {
        return <div className="main-container">
            {this.state.error!=="" && <p>{this.state.error}</p>}
            <h1>LOGIN HERE</h1>
            <form className="login-form" data-testid="form" onSubmit={this.handleLogin }> 
            <input  type="email" placeholder="Email" name="email" onChange={(e) => {this.setState({email:e.target.value})}}/>
            <input type="password" placeholder="Password" name ="password" onChange={(e) => {this.setState({password:e.target.value})}}/>
            <button className="button1"> Login </button>
           
        </form>
        </div>
    }
}

export default Login;