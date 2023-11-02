import React from 'react'
import { useEffect } from "react";
import WorkTypeTable from "../../../Components/CommonComponents/Table";
import { useDispatch, useSelector} from "react-redux";
import getWorkTypeData from '../../../Api/workTypeApi';
import "../../Css/workType.css";
import getTableData from "../../../Functions/Table/tableData";
import Status from '../../../Components/CommonComponents/Status';

function WorkType() {
  const data = useSelector((state) => state);
  const workTypeData = data.workType.workTypedata;
  const pageTitle = "Work Types"
  const tableTitle = "Work Types"
  const addTabletitle = "Add Work Types"
  const workTypeColumns = [
    { key: 'id', name: 'ID' },
    { key: 'worktype', name: 'Work Type' }
  ];
  const handleWorkTypeDelete =(id) =>{
    dispatch(getWorkTypeData('delete',id))
  }
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getWorkTypeData('fetch'));
  }, [dispatch]);
  if(workTypeData != ""){
    getTableData(workTypeColumns,workTypeData)
  }
  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-md-6'>
          <h1 className="h3 mb-4 text-gray-800">{pageTitle}</h1>
        </div>
      </div>
      <div>
        <WorkTypeTable 
          columns ={workTypeColumns} 
          Data = {workTypeData}
          propHandleDelete={handleWorkTypeDelete}
          propPageTitle = {tableTitle}
          propAddPageTitle = {addTabletitle}
        />
      </div>
    </div>
  )
}

export default WorkType