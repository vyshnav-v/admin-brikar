import { React, useState, useEffect } from "react";
import "../CommonComponents/table.css";
import Status from "./Status";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
export default function Table(props) {
  const [tableData, setTableData] = useState(props.Data);
  const [sortActive, setSortActive] = useState("up");
  const sortedData = props.Data;
  const responseMessage = props.propResponseMessage;
  const { propHandleDelete } = props;
  const { propHandleAdd, propDeleteMessage, propHandleEdit, propLoading } =
    props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const maxPaginationPages = 3;
  const loading = propLoading;
  const [show, setShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  useEffect(() => {
    setTableData(sortedData);
  }, [sortedData]);
  const filteredHeaders = props.columns.filter((header) => header.key !== "id");
  const tableHeaders = filteredHeaders.map((header) => (
    <th key={header.key} scope='col'>
      <span>
        <div
          className={`up-arrow ${sortActive == "up" ? "active-className" : ""}`}
          onClick={() => handleSort("up", header.key)}
        ></div>
        <div
          className={`down-arrow ${
            sortActive == "down" ? "active-className" : ""
          }`}
          onClick={() => handleSort("down", header.key)}
        ></div>
      </span>
      {header.name}
    </th>
  ));
  const handleSort = (sort, key) => {
    if (sort == "up") {
      const sortedData = [...props.Data].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      setTableData(sortedData);
      setSortActive("up");
    } else {
      const sortedData = [...props.Data].sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      });
      setTableData(sortedData);
      setSortActive("down");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };

  const confirmDelete = () => {
    propHandleDelete(itemToDelete);
    setTableData(tableData.filter((obj) => obj.id !== itemToDelete));
    handleClose();
  };
  const handleEdit = (id) => {
    propHandleEdit(id);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Calculate the start and end page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPaginationPages / 2));
  let endPage = Math.min(startPage + maxPaginationPages - 1, totalPages);

  if (totalPages <= maxPaginationPages) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= Math.floor(maxPaginationPages / 2)) {
    endPage = maxPaginationPages;
  } else if (currentPage >= totalPages - Math.floor(maxPaginationPages / 2)) {
    startPage = totalPages - maxPaginationPages + 1;
  }

  const pageRange = Array.from({ length: endPage - startPage + 1 }).map(
    (_, i) => startPage + i
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };
  return (
    <div className='card shadow mb-4'>
      <div className='card-header py-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h6 className='m-0 font-weight-bold text-primary'>
              {props.propPageTitle}
            </h6>
          </div>
          <div className='col-md-3'>
            <span className='add-sec'>
              <span className='add-label'>{props.propAddPageTitle}</span>
              <span
                className='btn btn-primary btn-circle btn-sm'
                onClick={() => {
                  propHandleAdd();
                }}
              >
                <i className='fas fa-add add-icon'></i>
              </span>
            </span>
          </div>
          <Status
            propResponseMessage={responseMessage}
            propActionType={"success"}
          />
        </div>
      </div>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th key='id' scope='col'>
                  <span>
                    <div
                      className='up-arrow'
                      onClick={() => handleSort("up", "id")}
                    ></div>
                    <div
                      className='down-arrow'
                      onClick={() => handleSort("down", "id")}
                    ></div>
                  </span>
                  ID
                </th>
                {tableHeaders}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData && !loading ? (
                currentData.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    {props.columns.map((header) =>
                      header.key !== "id" ? (
                        <td className='tableBody' scope='row'>
                          {item[header.key]}
                        </td>
                      ) : null
                    )}
                    <td className='tableBody'>
                      <span
                        className='btn btn-info btn-circle btn-sm'
                        onClick={() => handleEdit(item.id)}
                      >
                        <i className='fas fa-edit edit-icon'></i>
                      </span>

                      <span
                        className='btn btn-danger btn-circle btn-sm delete'
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className='fas fa-trash'></i>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='2'>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-flex justify-content-center card-header p-3'>
        <Pagination size='sm'>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          {startPage > 1 && (
            <Pagination.Ellipsis
              onClick={() => setCurrentPage(startPage - 1)}
            />
          )}
          {pageRange.map((page) => (
            <Pagination.Item
              key={page}
              active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          {endPage < totalPages && (
            <Pagination.Ellipsis onClick={() => setCurrentPage(endPage + 1)} />
          )}
          <Pagination.Item disabled onClick={handleLastPage}>
            {totalPages}
          </Pagination.Item>
          <Pagination.Next onClick={handleNextPage} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{propDeleteMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
