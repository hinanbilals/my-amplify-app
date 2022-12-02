import {  CognitoUserPool } from "amazon-cognito-identity-js";

var poolData = {
UserPoolId: "us-east-1_i5L7ws2UO",
ClientId: "6psdo707tl09hu9nmlrc52o8nq"
}

export default new CognitoUserPool(poolData);