import React from "react";
import logoImg from "../../assets/logo.jpg";
import FormInput from "../FormInput/FormInput";
import { useState, useRef} from "react";

export default function Form() {
    const [values, setValues] = useState({ 
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        dateOfBirth: ""
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        dateOfBirth: ""
    });
  
    const input = [
        {
            id:1,
            type: "email",
            name: "email",
            error: "Please enter a valid email address",
            placeholder: "Email"
        },
        {
            id:2,
            type: "password",
            name: "password",
            error: "Password must be at least 6 characters",
            placeholder: "Password"
        },
        {
            id:3,
            type: "password",
            name: "confirmPassword",
            error: "Passwords do not match",
            placeholder: "Confirm Password"
        },
        {
            id:4,
            type: "text",
            name: "firstName",
            error: "Please enter your first name",
            placeholder: "First Name"
        },
        {
            id:5,
            type: "text",
            name: "lastName",
            error: "Please enter your last name",
            placeholder: "Last Name"
        },
        {
            id:6,
            type: "date",
            name: "dateOfBirth",
            error: "Please enter your date of birth",
            placeholder: "Date of Birth"
        }
    ];
    
    
   
    
    const currentValues = useRef(values);
    const handleSubmit =() => {
        setValues(currentValues.current);
        if(currentValues.current.password !== currentValues.current.confirmPassword) {
            setErrors({confirmPassword: "Passwords do not match"});
            return;
        }
        createUser();
    };


    const createUser = () => {
            fetch("http://localhost:4000/auth/register", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            })
            .then(async (res) => {
                if (res.status === 201) {
                    console.log("Success");
                } else {
                    const error = await res.json();
                    Object.keys(error).forEach(key => {
                       setErrors(prevState => ({
                            ...prevState,
                            [key]: error[key].message
                        }));
                    });
                }
            })
            .then()
            .catch(err => console.log(err));
    }

    const onChange = (e) => {
        currentValues.current[e.target.name] = e.target.value;
        setErrors(prevState => ({
            ...prevState,
            [e.target.name]: ""
        }));
    }
    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Register</h2>
                    <div id='form' className="flex flex-col">
                    {input.map((item) => (
                        <div  key={item.id}>
                        <FormInput {...item} value={values[item.name]} onChange={onChange} />
    
                        <span>{errors[item.name]}</span>
                        </div>
                    ))}

                    <button className="btn" onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
                <div className="col-2">
                    <img src={logoImg} alt="bg" />
                    
                </div>
            </div>
        </section>
    );
}
