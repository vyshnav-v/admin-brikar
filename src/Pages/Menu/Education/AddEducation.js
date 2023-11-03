import React, { useEffect } from "react";
import Text from "../../../Components/InputComponents/Text";
import AddSecButtons from "../../../Components/CommonComponents/AddSecButtons";
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getEducationData from "../../../Api/educationApi";
import Status from "../../../Components/CommonComponents/Status";
import { useParams } from "react-router-dom";

function AddEducation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = "Add Education";
  const data = useSelector((state) => state);
  const [inputEducation, setInputEducation] = useState({
    qualification: "",
  });
  const [validationError, setValidationError] = useState({
    qualification: "",
  });
  const responseMessage = {
    insert: "Education successfully added",
    fail: "Some error occurred",
    update: "Education Updated Successfully",
  };
  const [areAllErrorsEmpty, setAreAllErrorsEmpty] = useState(
    Object.values(validationError).every((value) => !value)
  );
  const [editData, setEditData] = useState(data);
  console.log(
    "data",
    data.education.educationData.filter((obj) => obj.id == id)
  );
console.log("jhellooo",editData[0])
  useEffect(() => {
    if (inputEducation.qualification === "") {
      setValidationError({ qualification: "Required Field" });
    }
  }, [inputEducation]);

  useEffect(() => {
    if (editData[0] !== null) {
      setValidationError({ qualification: "" });
    }
  }, [editData]);

  const handleEducationChange = (newEducation) => {
    setInputEducation((prevState) => ({
      ...prevState,
      [newEducation.name]: newEducation.value,
    }));
    setValidationError((prevState) => ({
      ...prevState,
      [newEducation.name]: newEducation.value !== "" ? "" : "Required Field",
    }));
  };

  useEffect(() => {
    setAreAllErrorsEmpty(
      Object.values(validationError).every((value) => !value)
    );
  }, [validationError]);

  const handleAddEducation = (type) => {
    if (type === "save") {
      dispatch(getEducationData("insert", inputEducation, 0));
      // setInputEducation("");
    } else if (type === "cancel") {
      window.history.back();
    } else {
      if (id !== undefined) {
        dispatch(getEducationData("update", inputEducation, id));
      }
    }
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    setEditData(data.education.educationData.filter((obj) => obj.id == id));
  }, [data]);

  return (
    <div>
      <div className='container-fluid'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <span className='btn  ' onClick={goBack}>
                <i className='fa fa-chevron-left m-0 font-weight-bold '></i>
                <span className='add-label'> Back</span>
              </span>
              <div className='col-md-6'>
                <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
              </div>
              <div className='col-md-3'></div>
              <Status
                propResponseMessage={responseMessage}
                propActionType={id !== undefined ? "update" : "insert"}
              />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>
                  Education Type <span className='errorLabel'>*</span>
                </label>
                <Text
                  propOnChange={handleEducationChange}
                  propValidationError={validationError.qualification}
                  propAttributeValue='qualification'
                  propValue={editData[0] ? editData[0].qualification : ""}
                />
              </div>
            </div>
            <AddSecButtons
              handleSubmit={handleAddEducation}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEducation;
