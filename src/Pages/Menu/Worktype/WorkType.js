import React from "react";
import { useEffect } from "react";
import WorkTypeTable from "../../../Components/CommonComponents/Table";
import { useDispatch, useSelector } from "react-redux";
import getWorkTypeData from "../../../Api/workTypeApi";
import "../../Css/workType.css";
import getTableData from "../../../Functions/Table/tableData";
import Status from "../../../Components/CommonComponents/Status";
import { useNavigate } from "react-router-dom";

function WorkType() {
  const data = useSelector((state) => state);
  const workTypeData = data.workType.workTypedata;
  const loadingWorkType = data.workType.workTypeloading;
  const pageTitle = "Work Types";
  const tableTitle = "Work Types";
  const addTableTitle = "Add Work Types";
  const deleteConfirmMessage =
    "Are you sure you want to delete this work type?";
  const responseMessage = {
    success: "Worktype deleted successfully",
    fail: "some error occured",
  };
  const workTypeColumns = [
    { key: "id", name: "ID" },
    { key: "worktype", name: "Work Type" },
  ];

  const navigate = useNavigate();
  const handleWorkTypeDelete = (id) => {
    dispatch(getWorkTypeData("delete", id));
  };
  const handleWorkTypeEdit = (id) => {
    navigate(`/edit-worktype/${id}`);
  };
  const handleWorkTypeAdd = () => {
    navigate("/add-worktype");
  };
  const dispatch = useDispatch();
  console.log(workTypeData);
  useEffect(() => {
    dispatch(getWorkTypeData("fetch"));
  }, [dispatch]);
  if (workTypeData != "") {
    getTableData(workTypeColumns, workTypeData);
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h1 className='h3 mb-4 text-gray-800'>{pageTitle}</h1>
        </div>
      </div>
      <div>
        <WorkTypeTable
          columns={workTypeColumns}
          Data={workTypeData}
          propHandleDelete={handleWorkTypeDelete}
          propHandleEdit={handleWorkTypeEdit}
          propHandleAdd={handleWorkTypeAdd}
          propLoading={loadingWorkType}
          propResponseMessage={responseMessage}
          propDeleteMessage={deleteConfirmMessage}
          propPageTitle={tableTitle}
          propAddPageTitle={addTableTitle}
        />
      </div>
    </div>
  );
}

export default WorkType;
