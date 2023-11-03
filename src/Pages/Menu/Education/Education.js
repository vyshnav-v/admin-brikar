import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getEducationData from "../../../Api/educationApi";
import EducationTable from "../../../Components/CommonComponents/Table";
import Status from "../../../Components/CommonComponents/Status";
import { useNavigate } from "react-router-dom";

function Education() {
  const data = useSelector((state) => state);
  const educationData = data.education.educationData;
  const loadingEducation = data.education.educationLoading;
  const pageTitle = "Education";
  const tableTitle = "Education";
  const addTableTitle = "Add Education";
  const deleteConfirmMessage = "Are you sure you want to delete this Data?";
  const responseMessage = {
    success: "Data deleted successfully",
    fail: "Some error occurred",
  };
  
  const educationColumns = [
    { key: "id", name: "ID" },
    { key: "qualification", name: "Qualification" },
    // Add more columns as needed
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEducationDelete = (id) => {
    dispatch(getEducationData("delete", id));
  };

  const handleEducationEdit = (id) => {
    navigate(`/edit-education/${id}`);
  };

  const handleEducationAdd = () => {
    navigate("/add-education");
  };

  useEffect(() => {
    console.log(educationData);
    dispatch(getEducationData("fetch"));
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <EducationTable
          columns={educationColumns}
          Data={educationData}
          propHandleDelete={handleEducationDelete}
          propHandleEdit={handleEducationEdit}
          propHandleAdd={handleEducationAdd}
          propLoading={loadingEducation}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
        />
      </div>
    </div>
  );
}

export default Education;
