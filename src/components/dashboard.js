import React, { useState }  from "react";
import { CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const Dashboard = () =>{

    
const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
        console.log(user);
        user.signOut();
        
    }
  };

return (

<div>

<h1>Dashboard</h1>

<button onClick={logout}>Logout</button>




</div>





);
};

export default Dashboard;