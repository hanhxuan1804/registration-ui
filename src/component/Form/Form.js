import React from "react";
import logoImg from "../../assets/logo.jpg";
import {useForm} from "react-hook-form";

export default function Form() {
    const {register, handleSubmit, watch,  formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);
    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Register</h2>
                    <ul>Already have an account? <a href="#">Login</a></ul>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" placeholder="Email" {...register("email",{required: true, pattern: /^\S+@\S+$/i})}/>
                        {errors.email && errors.email.type === "required" && <span>This field is required</span>}
                        {errors.email && errors.email.type === "pattern" && <span>Invalid email address</span>}
                        <input type="password" placeholder="Password" {...register("password",{required: true, minLength: 6})}/>
                        {errors.password && errors.password.type === "required" && <span>This field is required</span>}
                        {errors.password && errors.password.type === "minLength" && <span>Password must be at least 6 characters</span>}
                        <input type="password" placeholder="Confirm Password" {...register("confirmPassword",{required: true})}/>
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && <span>This field is required</span>}
                        {!errors.confirmPassword && watch("confirmPassword") !== watch().password && <span>Passwords do not match</span>}
                        <input type="text" placeholder="Full name" {...register("fullname",{required: true})}/>
                        {errors.fullname && errors.fullname.type === "required" && <span>This field is required</span>}
                        <input type="date" placeholder="Date of Birth" {...register("dateOfBirth",{required: true})} defaultValue={"2000-01-01"}/>
                        {errors.dateOfBirth && errors.dateOfBirth.type === "required" && <span>This field is required</span>}

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
                <div className="col-2">
                    <img src={logoImg} alt="bg" />
                    
                </div>
            </div>
        </section>
    );
}
