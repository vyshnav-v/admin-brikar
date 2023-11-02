import { Navigate } from "react-router-dom";
//Here we are saving the userinfo after loging
const saveUserInfo = (data) => {
  localStorage.setItem("userInfo", data.access_token);
  localStorage.setItem("refreshToken", data.refresh_token);
  window.location.href = "/dashboard";
};

//Here we are saving new access token after call refreshtoken api
const saveAccesToken = (data) => {
  localStorage.setItem("userInfo", data.access_token);
  //window.location.href = "/dashboard";
};

const removeUserInfo = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("refreshToken");
};
//To check user is loggedin or not ...
const isLoggedIn = () => {
  try {
    const value = localStorage.getItem("userInfo");
    return !!value;
  } catch {
    return false;
  }
};

export { removeUserInfo, isLoggedIn , saveAccesToken };
export default saveUserInfo;
