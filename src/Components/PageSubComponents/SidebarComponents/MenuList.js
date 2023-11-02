import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function MenuList() {
  return (
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <FontAwesomeIcon icon={faGear} />
        <span className="comp">Manage Users</span>
      </a>
      <div
        id="collapseTwo"
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Custom Components:</h6>
          <a className="collapse-item" href="buttons.html">
            ADD MENU
          </a>
          <span className="collapse-item" href="cards.html">
            <span className="sideLink">
              <Link to="/users">Users</Link>
            </span>
          </span>
        </div>
      </div>
    </li>
  );
}

export default MenuList;
