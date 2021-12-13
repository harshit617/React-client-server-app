const validation=(userInfo)=>{
    let errors={};
    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
   if(!userInfo.username){
        errors.username="Name is Required"
    }
    else if( userInfo.username.length<3){
        errors.username="length should be greator than 3"
    }
    

    if(!userInfo.email){
        errors.email="Email is required."
    }else if(!emailRegex.test(userInfo.email)){
        errors.email="Email should be valid."
    }

if(!userInfo.password){
    errors.password="password is required."

}else if(userInfo.password.length<5){
    errors.password="password should be greator than 5"
}

return errors;
}
export default validation;