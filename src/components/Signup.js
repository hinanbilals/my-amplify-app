import React, { useState }  from "react";
import UserPool from "../UserPool";
import { CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";


const Signup = () =>{
    
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [enableOtp, setEnableOtp] = useState("");

    
const confirmOTP = (event) => {
    event.preventDefault();
    
    const user = new CognitoUser({
        Username: username,
        Pool: UserPool
       });

    console.log(user);
    user.confirmRegistration(otp, true, (err, result) => {
        if (err) {
        console.log('error', err.message);
        }
        
        console.log('call result: ' + JSON.stringify(result));
       });

};
const onSubmit = (event) => {
event.preventDefault();

const attributeList = [];
    attributeList.push(
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );

UserPool.signUp(username, password,attributeList, null, (err, data)=>{
    if (err){
        console.log(err);
    }
    setEnableOtp("true");
    console.log(data);
});
};

return (
<div>
<h1>Signup Page</h1>

<form onSubmit={onSubmit}>
    
Email:    
<input value={email} onChange={(event) => setEmail(event.target.value)}/>  
Username:
<input value={username} onChange={(event) => setUsername(event.target.value)}/>  
Password:
<input value={password} onChange={(event) => setPassword(event.target.value)}/> 
<button type="submit"> Signup </button>
</form>
{
    enableOtp === "true" ?
    (<>
    <form onSubmit={confirmOTP}>
    Insert OTP: <input value={otp} onChange={(event) => setOtp(event.target.value)}/> <button type="submit"> Verify Otp </button>
    </form>
    </>):
    (<></>)
}

</div>

);
};

export default Signup;