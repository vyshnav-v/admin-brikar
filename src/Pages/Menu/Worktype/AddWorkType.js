import {React,useEffect} from 'react'
import Text from '../../../Components/InputComponents/Text'
import AddSecButtons from '../../../Components/CommonComponents/AddSecButtons'
import "../../Css/menu.css";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import getWorkTypeData from '../../../Api/workTypeApi';
import WorkType from './WorkType';
import Status from '../../../Components/CommonComponents/Status';
import { useParams } from 'react-router-dom';

function AddWorkType() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageTitle = "Add Worktypes"
  const data = useSelector((state) => state);
  useEffect(() => {
    dispatch(getWorkTypeData('fetch'));
  }, [])
  const [inputWorkType, setInputWorkType] = useState({
    'worktype' : ""
  });
  const [workTypevalidationError,setWorkTypeValidationError] = useState("Required Field");
  const [validationError,setValidationError] = useState({
    worktype: workTypevalidationError
  });
  const responseMessage = {
    "insert" : "Worktype successfully added",
    "fail"    : "some error occured",
    "update"  : "Worktype Updated Successfully"
  }
  const [areAllErrorsEmpty,setAreAllErrorsEmpty] = useState(Object.values(validationError).every((value) => !value));
  const [editData, setEditData] = useState(data);
  const handleWorkTypeChange = (newWorkType)=> {
    setInputWorkType((prevState)=>({
      ...prevState,
      [newWorkType.name] : newWorkType.value
    }))
    setValidationError((prevState) => ({
      ...prevState,
      [newWorkType.name]: newWorkType.value !="" ? "" : "Required Field"
    }))
  }
  useEffect(() => {
    setAreAllErrorsEmpty(Object.values(validationError).every((value) => !value));
  }, [validationError])
  const handleAddWorkType =(type) =>{
    if(type == 'save'){
      dispatch(getWorkTypeData('insert',inputWorkType,0))
    }else{
      if(id !== undefined){
        dispatch(getWorkTypeData('update',inputWorkType,id))
      }
    }
  }
  useEffect(() => {
      setEditData(data.workType.workTypedata.filter(obj => obj.id == id));
  }, [data])
  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className='row'>
              <div className='col-md-6'>
                <h1 className="h3 mb-4 text-gray-800">{pageTitle}</h1>
              </div>
              <div className='col-md-3'></div>
              <Status 
                propResponseMessage={responseMessage}
                propActionType={id !== undefined ? "update" : "insert"}
              />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <label>Work Type Name <span className='errorLabel'>*</span></label>
                <Text 
                  onWorkTypeChange={handleWorkTypeChange} 
                  propValidationEror={workTypevalidationError}
                  propAttributeValue = "worktype"
                  propValue = {editData[0] ? editData[0].worktype : ""} />
              </div>
            </div>
            <AddSecButtons 
              handleSubmit={handleAddWorkType}
              propAllErrorEmpty={areAllErrorsEmpty}
              propValue = {id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddWorkType