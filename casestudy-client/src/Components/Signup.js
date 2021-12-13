import { getThemeProps } from "@material-ui/styles";
import React, { Component, useState} from "react";
//import '../styles/form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import validation from "./vaidation";

function Signup(props) {
   
 const [values, setValues] = useState({
     email:'',
     username:'',
     dob:new Date(),
     password:'',
     description:''
 })

 const [errors,setErrors] = useState({})

 const[apierror, setapierror] = useState({message:""})
    

  const  handleChange = (event) => {
        // event.preventDefault();
        setValues({
            ...values,
            [event.target.name]:event.target.value
        })
        }

    async function  handleSignup(event)  {
        event.preventDefault();
        setErrors(validation(values));
        let items = {...values};
        try{ 
       let result = await fetch('http://localhost:8000/auth/signup', {
            method:"PUT",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(items)
        })
       if(result.status==422){
           throw new Error('jaa na')
       }
        result = await result.json
        
        localStorage.setItem('signupresult', JSON.stringify(result));
        {Object.keys(validation(values)).length===0 && 
        alert('User registered')
       props.history.push('/');
        }
        return result;
    }catch(err){
        console.log("ye rhi error");
        return alert("Email is already registeerd")
    }

    }


    return <div className="main-container">
   
        <h1>SIGNUP FORM</h1>
        <form className="login-form" onSubmit={handleSignup}> 
        <input  type="email" placeholder="Email" name="email"  onChange={handleChange} value = {values.email}/>
        {errors.email && <p className="error">{errors.email}</p>}
        <input  type="text" placeholder="Username" name="username" onChange={handleChange} value = {values.username}/>
        {errors.username && <p className="error">{errors.username}</p>}
        <DatePicker wrapperClassName="datePicker" placeholderText="Date of Birth" name="dob" selected={values.dob} onChange={(date)=>setValues({...values, dob:date})} dateFormat='dd/MM/yyyy' showYearDropdown scrollableYearDropdown />
        <input type="password" placeholder="Password" name ="password"  onChange={handleChange} value = {values.password} />
        {errors.password && <p className="error">{errors.password}</p>}
        <input  type="text" placeholder="About Yourself" name="description"  onChange={handleChange} value = {values.description}/>
        {apierror && <p className="error">{apierror.message}</p>}
                 
        <button className="button1"> Signup </button>
    </form>
    
    </div>

}
export default Signup;


// .then((result)=>{
//     result.json().then((resp)=>{
//         console.log(resp);
        
//         console.log(this.state.errorMessage)
//         this.props.history.push('/');
        
//     })
// }).catch(err => {
//     console.log(err);

//     this.setState((state) => ({
//         errorMessage:err.data[0].msg
//        }))
   
// })