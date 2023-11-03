import React from "react";
import { Link } from "react-router-dom";

function MasterMenu() {
  return (
    <li className='nav-item'>
      <a
        className='nav-link collapsed'
        href='#'
        data-toggle='collapse'
        data-target='#collapsePages'
        aria-expanded='true'
        aria-controls='collapsePages'
      >
        <i className='fas fa-fw fa-folder'></i>
        <span>Master Section</span>
      </a>
      <div
        id='collapsePages'
        className='collapse'
        aria-labelledby='headingPages'
        data-parent='#accordionSidebar'
      >
        <div className='bg-white py-2 collapse-inner rounded'>
          <h6 className='collapse-header'>Work Types:</h6>
          <Link className='collapse-item' to='/worktypes'>
            Work Type
          </Link>
          
          <Link className='collapse-item' to='/education'>
            Education
          </Link>

          <a className='collapse-item' href='forgot-password.html'>
            Forgot Password
          </a>
          <div className='collapse-divider'></div>
          <h6 className='collapse-header'>Other Pages:</h6>
          <a className='collapse-item' href='404.html'>
            404 Page
          </a>
          <a className='collapse-item' href='blank.html'>
            Blank Page
          </a>
        </div>
      </div>
    </li>
  );
}

export default MasterMenu;
