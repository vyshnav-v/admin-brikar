import axios from "axios";
import { setData, setError, setLoading } from "../Actions/loginAction";
import saveUserInfo from "../Util/loginUtil";
import saveAccesToken from "../Util/loginUtil";
import c from "../GlobalConstants/URL";
import g from "../GlobalConstants/APIConstants";

function getLoginData(email, password) {
  return function (dispatch) {
    dispatch(setLoading(true));
    dispatch(setError(false));
    axios
      .post(
        c.LOGINURL,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "x-api-key": g.APIKEY,
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          dispatch(setData(response.data));
          saveUserInfo(response.data);
        }
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setError(e.response.data.message));
      });
  };
}

function getRefreshToken() {
  const refreshConfig = {
    headers: {
      "x-api-key": g.APIKEY,
      Authorization: `Bearer ${g.REFRESHTOKEN}`,
    },
  };
  return function (dispatch) {
    axios.post(c.REFRESHURL, {}, refreshConfig).then((response) => {
      if (response.status == 200) {
        saveAccesToken(response.data);
      }
    });
  };
}
export default getLoginData;
export { getRefreshToken };
