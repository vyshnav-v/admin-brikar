import axios from "axios";
import {
  setEducationData,
  setEducationError,
  setEducationLoading,
  setAddEducationSuccess,
  setAddEducationFail,
} from "../Actions/educationAction";
import { setLoading, setError } from "../Actions/commonAction";
import c from "../GlobalConstants/URL";
import g from "../GlobalConstants/APIConstants";



 const getEducationData =(arg, data, id) =>async (dispatch) => {

  const usersConfig = {
    headers: {
      "x-api-key": g.APIKEY,
      Authorization: `Bearer ${g.ACCESTOKEN}`,
    },
  };
  
  try {
    dispatch(setEducationLoading(true));
    dispatch(setEducationError(false));
    dispatch(setAddEducationSuccess(false));
    dispatch(setAddEducationFail(false));
    
    if (arg === "fetch") {
      const response = await axios.get(c.FETCHEDUCATIONURL, usersConfig);
      if (response.status === 200) {
        dispatch(setEducationData(response.data));
      }
      dispatch(setEducationLoading(false));
    } else if (arg === "insert") {
      dispatch(setLoading(true));
      dispatch(setError(false));
      dispatch(setAddEducationSuccess(false));
      dispatch(setAddEducationFail(false));
      const response = await axios.post(c.GETEDUCATIONURL, data, usersConfig);
      if (response.status === 201) {
        dispatch(setAddEducationSuccess(true));
      }
      dispatch(setLoading(false));
    } else if (arg === "update") {
      dispatch(setLoading(true));
      dispatch(setError(false));
      dispatch(setAddEducationSuccess(false));
      dispatch(setAddEducationFail(false));
      const response = await axios.put(`${c.GETEDUCATIONURL}${id}`, data, usersConfig);
      if (response.status === 200) {
        dispatch(setAddEducationSuccess(true));
      }
      dispatch(setLoading(false));
    } else if (arg === "delete") {
      dispatch(setLoading(true));
      dispatch(setError(false));
      dispatch(setAddEducationSuccess(false));
      dispatch(setAddEducationFail(false));
      const response = await axios.delete(`${c.GETEDUCATIONURL}${data}`, usersConfig);
      if (response.status === 204) {
        dispatch(setAddEducationSuccess(true));
      }
      dispatch(setEducationLoading(false));
    }

  } catch (e) {
    dispatch(setEducationLoading(false));
    dispatch(setAddEducationFail(true));
    dispatch(setError(e.response ? e.response.data.message : "An error occurred"));
  }
} 

export default getEducationData;
