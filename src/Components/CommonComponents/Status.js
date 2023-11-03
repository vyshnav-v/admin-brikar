import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import setStoreValues from "../../Api/CommonApi";
function Status(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const currentStatus = data.workType.addWorktypeStatus ? false : true;
  const currentStatusFail = data.workType.addWorktypeStatusFail ? false : true;
  const handleClick = (status) => {
    if (status === "success") {
      dispatch(setStoreValues(currentStatus, "success"));
    } else {
      dispatch(setStoreValues(currentStatusFail, "fail"));
    }
  };
  const textColorClass = data.workType.addWorktypeStatus
    ? "text-primary"
    : data.workType.addWorktypeStatusFail
    ? "text-danger"
    : "text-primary";
  const borderColorClass = data.workType.addWorktypeStatus
    ? "border-left-primary"
    : data.workType.addWorktypeStatusFail
    ? "border-left-danger"
    : "border-left-primary";
  const status = data.workType.addWorktypeStatus
    ? "success"
    : data.workType.addWorktypeStatusFail
    ? "fail"
    : "success";
  const iconClass = data.workType.addWorktypeStatus
    ? "fas fa-check"
    : data.workType.addWorktypeStatusFail
    ? "fa-exclamation"
    : "fas fa-check";

  return data.workType.addWorktypeStatus ||
    data.workType.addWorktypeStatusFail ? (
    <div className='col-md-3 messagecard'>
      <div
        className={`row no-gutters align-items-center ${borderColorClass} shadow h-100 py-2 message-body`}
      >
        <div className='col-auto chck-b'>
          <i className={`${iconClass} fa-2x text-gray-300`}></i>
        </div>
        <div className='col mr-2'>
          <div
            className={`text-xs font-weight-bold ${textColorClass} text-uppercase mb-1`}
          >
            {data.workType.addWorktypeStatus && props.propActionType == "insert"
              ? props.propResponseMessage.insert
              : data.workType.addWorktypeStatus &&
                props.propActionType == "update"
              ? props.propResponseMessage.update
              : data.workType.addWorktypeStatus &&
                props.propActionType == "success"
              ? props.propResponseMessage.success
              : data.workType.addWorktypeStatusFail
              ? props.propResponseMessage.fail
              : ""}
          </div>
        </div>
        <i
          className='fas fa-times fa-2x text-black-300 cursor-s'
          onClick={() => handleClick(status)}
        ></i>
      </div>
    </div>
  ) : null;
}

export default Status;
