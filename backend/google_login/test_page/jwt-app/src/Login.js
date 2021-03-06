import React from "react";
import { GoogleLogin } from "react-google-login";
import Axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

const responseGoogle = async (response) => {
  console.log(1, response);
  let jwtToken = await Axios.post(
    "http://k6c105.p.ssafy.io:8080/api/auth/google",
    JSON.stringify(response),
    config
  );
  if (jwtToken.status === 200) {
    // console.log(2, jwtToken.data);
    console.log(jwtToken);
    localStorage.removeItem("jwtToken");
    localStorage.setItem("jwtToken", jwtToken.data[0]);
    localStorage.setItem("refreshToken", jwtToken.data[1]);
  }
};

const Login = () => {
  return (
    <GoogleLogin
      clientId="494017509395-3uipbu257km7e7j6ik00ggeb3cb9t96f.apps.googleusercontent.com"
      buttonText="Google 로그인"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;