import React from "react";
import { useState,useEffect } from "react";
import "../../Components/CommonComponents/input.css"

export default function Text(props) {
    const { onWorkTypeChange } = props; 
    const [inputText,setInputText] =  useState("");
    const [validationError,setValidationError] = useState(false);
    useEffect(() => {
        setValidationError(props.propValidationEror)
    }, [props.propValidationEror])
    
    useEffect(() => {
        setInputText(props.propValue);
    }, [props.propValue])
    
    const handleTextInputChange = (event) => {
        setValidationError(event.target.value==""?"Required Field":"")
        const newTextInput = event.target.value;
        setInputText(event.target.value);
        onWorkTypeChange({'name':event.target.name,'value':newTextInput});
    }
    return (
        <div>
            <input
                type="text"
                className="form-control form-control-user"
                value={inputText}
                id="exampleInputText"
                placeholder=""
                onChange={handleTextInputChange}
                name={props.propAttributeValue}
            />
            {validationError ? <span class="tooltiptext">{validationError}</span> : ""}
        </div>
    );
}
