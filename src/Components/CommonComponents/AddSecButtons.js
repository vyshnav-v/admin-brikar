import {React,useEffect,useState} from 'react'
import "./addsecbutton.css";
function AddSecButtons(props) {
    const { handleSubmit } = props;
    const [allErrorsEmpty,setAllErrorsEmpty] = useState(false)
    useEffect(() => {
        console.log(props.propAllErrorEmpty)
      setAllErrorsEmpty(props.propAllErrorEmpty)
    }, [props.propAllErrorEmpty])
    
    const handleButtonClick = (type) => {
        handleSubmit(type); 
    }
  return (
    <div className="row button-margin">
        <div className="col-md-6 button">
        <button
            type='button'
            disabled={!allErrorsEmpty}
            className="btn btn-sm btn-primary btn-icon-split save-button">
            <span class="icon text-white-50">
                <i class="fas fa-save"></i>
            </span>
            <span class="text" onClick={() => handleButtonClick(props.propValue === undefined ? "save" : "update")}>
                {props.propValue === undefined ? "Save" : "Update"}
            </span>
        </button>
        <a
            class="btn btn-sm btn-danger btn-icon-split save-button">
            <span class="icon text-white-50">
                <i class="fas fa-stop"></i>
            </span>
            <span class="text" onClick={() => handleButtonClick('cancel')}>Cancel</span>
        </a>
        </div>
    </div>
  )
}

export default AddSecButtons