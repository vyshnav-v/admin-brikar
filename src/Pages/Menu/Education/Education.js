import React from "react";
import EducationTable from "../../../Components/CommonComponents/Table";

const Education = () => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <h1 className='h3 mb-4 text-gray-800'>Education</h1>
          </div>
        </div>
        <div>
          <EducationTable />
        </div>
      </div>
    </>
  );
};

export default Education;
