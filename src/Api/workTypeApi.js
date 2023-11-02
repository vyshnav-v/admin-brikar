import axios from "axios";
import {
  setWorkTypeData,
  setWorkTypeError,
  setWorkTypeLoading,
  setAddWorkTypeSuccess,
  setAddWorkTypeFail,
} from "../Actions/workTypeAction";
import { setLoading, setError } from "../Actions/commonAction";
import c from "../GlobalConstants/URL";
import g from "../GlobalConstants/APIConstants";

function getWorkTypeData(arg, data, id) {
  const usersConfig = {
    headers: {
      "x-api-key": g.APIKEY,
      Authorization: `Bearer ${g.ACCESTOKEN}`,
    },
  };
  return function (dispatch) {
    dispatch(setWorkTypeLoading(true));
    dispatch(setWorkTypeError(false));
    dispatch(setAddWorkTypeSuccess(false));
    dispatch(setAddWorkTypeFail(false));
    if (arg === "fetch") {
      axios
        .get(c.GETWORKTYPEURL, usersConfig)
        .then((response) => {
          if (response.status == 200) {
            dispatch(setWorkTypeData(response.data));
          }
          dispatch(setWorkTypeLoading(false));
        })
        .catch((e) => {
          dispatch(setWorkTypeLoading(false));
          dispatch(setAddWorkTypeFail(true));
          dispatch(setError(e.response.data.message));
        });
    } else if (arg === "insert") {
      dispatch(setLoading(true));
      dispatch(setError(false));
      dispatch(setAddWorkTypeSuccess(false));
      dispatch(setAddWorkTypeFail(false));
      axios
        .post(c.ADDWORKTYPEURL, data, usersConfig)
        .then((response) => {
          if (response.status == 201) {
            dispatch(setAddWorkTypeSuccess(true));
          }
          dispatch(setLoading(false));
        })
        .catch((e) => {
          dispatch(setLoading(false));
          dispatch(setAddWorkTypeFail(true));
          dispatch(setError(e.response.data.message));
        });
    } else if (arg === "update") {
      dispatch(setLoading(true));
      dispatch(setError(false));
      dispatch(setAddWorkTypeSuccess(false));
      dispatch(setAddWorkTypeFail(false));
      axios
        .put(`${c.GETWORKTYPEURL}${id}`, data, usersConfig)
        .then((response) => {
          if (response.status == 200) {
            dispatch(setAddWorkTypeSuccess(true));
          }
          dispatch(setLoading(false));
        })
        .catch((e) => {
          dispatch(setLoading(false));
          dispatch(setAddWorkTypeFail(true));
          dispatch(setError(e.response.data.message));
        });
    } else if (arg === "delete") {
      dispatch(setLoading(true));
      dispatch(setError(false));
      dispatch(setAddWorkTypeSuccess(false));
      dispatch(setAddWorkTypeFail(false));
      axios
        .delete(`${c.GETWORKTYPEURL}${data}`, usersConfig)
        .then((response) => {
          if (response.status == 204) {
            dispatch(setAddWorkTypeSuccess(true));
          }
          dispatch(setWorkTypeLoading(false));
        })
        .catch((e) => {
          dispatch(setAddWorkTypeFail(true));
          dispatch(setLoading(false));
          dispatch(setError(e.response.data.message));
        });
    }
  };
}

export default getWorkTypeData;
