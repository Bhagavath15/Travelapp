import { useState } from 'react';
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export function Login() {
    const navigate = useNavigate();
    const [formstate, setformstate] = useState("success");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            console.log("submit")
            const data = await fetch("http://localhost:4010/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (data.status === 400) {
                console.log("error");
                setformstate("error");
            } else {
                setformstate("success");
                const result = await data.json();
                console.log("success", result);
                localStorage.setItem("token", result.token);
                navigate("/dashboard");
            }

        }
    });
    return (
        <div className="login-card">
            <div className="login-image">
                <img src="https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHRyYXZlbCUyMGFnZW5jeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
            </div>
            <div className="card">
                <form onSubmit={formik.handleSubmit} className='loginform'>
                    <h2>LOGIN</h2>
                    <div className='loginfield'>
                        <TextField
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            label="Username"
                            variant="outlined" />
                        <TextField
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined" />
                        <label className="alreadyuser" onClick={() => navigate("/forget-password")} >
                            Forget Password ?
                        </label>
                        <div className="btn">
                            <Button color={formstate} type='submit' variant="contained">{formstate === "success" ? "submit" : "retry"}</Button>
                            <label className="alreadyuser" onClick={() => navigate("/register")}>Create Account</label>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}


export function Signin() {
    const navigate = useNavigate()
    const [formstate, setformstate] = useState("success")

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: '',
            password: '',
            phoneNo: ''
        },
        // validationSchema: formValidationSchema,
        onSubmit: (newdata) => {
            // console.log(values)
            adddata(newdata)
        }
    });

    const adddata = (newdata) => {
        console.log(newdata)

        fetch("http://localhost:4010/signup", {
            method: "POST",
            body: JSON.stringify(newdata),
            headers: {
                "content-type": "application/json"
            }
        })
        navigate("/")
    };
    return (
        <div className="login-card">
            <div className="signup-image">
                <img src="https://images.unsplash.com/photo-1515041219749-89347f83291a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWUlMjBjaGFyYWN0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" />
            </div>
            <div className="signup-card">
                <form onSubmit={formik.handleSubmit} className='loginform'>
                    <h2>SIGNUP</h2>
                    <div className='loginfield'>
                        <div className="login-flexend">
                            <div className="login-text">
                                <label>First Name : </label>
                                <TextField
                                    placeholder="firstname"
                                    name='firstname'
                                    value={formik.values.firstname}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Firstname"
                                    variant="outlined" />
                            </div>
                            <div className="login-text">
                                <label>Last Name : </label>
                                <TextField
                                    placeholder="lastname"
                                    name='lastname'
                                    value={formik.values.lastname}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Lastname"
                                    variant="outlined" />
                            </div>
                            <div className="login-text">
                                <label> Email : </label>
                                <TextField
                                    placeholder="username"
                                    name='username'
                                    value={formik.values.username}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Username"
                                    variant="outlined" />
                            </div>
                            <div className="login-text">
                                <label>Password : </label>
                                <TextField
                                    placeholder="password"
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined" />
                            </div>
                            <div className="login-text">
                                <label>Phone Number : </label>
                                <TextField
                                    placeholder="phoneNo"
                                    value={formik.values.phoneNo}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    label="Phone Number"
                                    name="phoneNo"
                                    type="text"
                                    variant="outlined" />
                            </div>
                        </div>

                        <Button color="success" type='submit' variant="contained">submit</Button>
                        <p className="alreadyuser" onClick={() => navigate("/")} sx={{ fontSize: 7 }}>
                            Already registered user
                        </p>
                    </div>

                </form>

            </div>
        </div>
    );
}