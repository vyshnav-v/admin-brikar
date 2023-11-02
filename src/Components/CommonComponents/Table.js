import {React,useState,useEffect} from "react";
import "../CommonComponents/table.css";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Status from "./Status";
export default function Table(props) {
    const [tableData, setTableData] = useState(props.Data);
    const [sortActive, setSortActive] = useState("up");
    useEffect(() => {
        setTableData(props.Data)
    }, [props.Data])
    const responseMessage = {
        "success" : "Worktype deleted successfully",
        "fail"    : "some error occured"
    }
    const sortedData = props.Data;
    const {propHandleDelete} = props;
    const {propHandleEdit} = props;
    const filteredHeaders = props.columns.filter((header) => header.key !== "id");
    const tableHeaders = filteredHeaders.map((header) => (
        <th key={header.key} scope="col">
            <span>
                <div class={`up-arrow ${sortActive == 'up' ? 'active-class' : ''}`} onClick={() => handleSort("up",header.key)}></div>
                <div class={`down-arrow ${sortActive == 'down' ? 'active-class' : ''}`} onClick={() => handleSort("down",header.key)}></div>
            </span>
            {header.name}
        </th>
    ));
    const handleSort = (sort,key)=>{
        if(sort == "up"){
            const sortedData = [...props.Data].sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            });
            setTableData(sortedData);
            setSortActive("up")
        }else{
            const sortedData = [...props.Data].sort((a, b) => {
                if (a[key] > b[key]) return -1;
                if (a[key] < b[key]) return 1;
                return 0;
            });
            setTableData(sortedData);
            setSortActive("down");
        }
    }
    const data    = useSelector((state) => state);
    const loading = data.workType.workTypeloading;
    const handleDelete = (id) =>{
        propHandleDelete(id);
        console.log(data.workType.addWorktypeStatus)
        if(data.workType.addWorktypeStatus){
            console.log(tableData.filter(obj => obj.id !== id))
            setTableData(tableData.filter(obj => obj.id !== id));
        }
    }
    const handleEdit = (id) =>{
        
    }
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-md-6">
                        <h6 className="m-0 font-weight-bold text-primary">
                            {props.propPageTitle}
                        </h6>
                    </div>
                    <div className="col-md-3">
                        <span className="add-sec"> 
                            <span className="add-label">{props.propAddPageTitle}</span>
                            <span className="btn btn-primary btn-circle btn-sm">
                            <Link to="/add-worktype"><i class="fas fa-add add-icon"></i></Link>
                            </span>
                        </span>
                    </div>
                    <Status propResponseMessage={responseMessage}/>
                </div>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th key="id" scope="col">
                                <span>
                                        <div class="up-arrow" onClick={() => handleSort("up","id")}></div>
                                        <div class="down-arrow" onClick={() => handleSort("down","id")}></div>
                                    </span>
                                    ID
                                </th>
                                {tableHeaders}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData && !loading ? (
                                tableData.map((item, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        {props.columns.map((header) => (
                                            header.key !== 'id' ? (
                                                <td className="tableBody" scope="row">
                                                    {item[header.key]}
                                                </td>
                                            ):null
                                        ))}
                                        <td className="tableBody">
                                            <span className="btn btn-info btn-circle btn-sm">
                                                <Link to={`/edit-worktype/${item.id}`} style={{ textDecoration: 'none' }}>
                                                    <i class="fas fa-edit edit-icon"></i>
                                                </Link>
                                            </span>
                                            <span 
                                                className="btn btn-danger btn-circle btn-sm delete"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <i 
                                                    class="fas fa-trash"
                                                >
                                                </i>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );}
