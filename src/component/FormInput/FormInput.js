import React from "react";

export default function FormInput(props) {

    return (
        <div id="input">
        <input type={props.type} name={props.name} placeholder={props.placeholder} required={true} onChange={props.onChange}/>
        </div>
    );
}