import React, { useState }  from "react";
import { CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import Dashboard from './dashboard';

const Signin = () =>{
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const [showDashboard, setshowDashboard] = useState(false);

const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
        console.log(user); 
        user.signOut();
    }
  };

  
  



const onSubmit = (event) => {
event.preventDefault();
const cognito_user = new CognitoUser({Username : username, Pool : UserPool});
const authDetails = new AuthenticationDetails({Username: username, Password: password});

cognito_user.authenticateUser(authDetails, {
    onSuccess: (data) => {
        setshowDashboard(true);

        console.log("Success", data);
    },
    onFailure: (data) => {
        console.log("Failed", data);
    },
    newPasswordRequired: (data) => {
        console.log("new password required", data);
    }

})

};

return (
<div>

{ showDashboard === false ?
(<><h1>Signin Page</h1>

<button onClick={logout}>Logout</button>
<form onSubmit={onSubmit}>
Username:
<input value={username} onChange={(event) => setUsername(event.target.value)}/>  
Password:
<input value={password} onChange={(event) => setPassword(event.target.value)}/> 
<button type="submit"> Signin </button>
</form>
</>):

(<><Dashboard></Dashboard></>)
}
</div>
);
};

export default Signin;