import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticate } from '../Services/FormServices';

function Form(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [type, setType] = useState("signup");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        setType(props.type);
    }, [props.type]);




    const signupForm = (title) => {
        return (
            <div className='container mt-5'>
                <div className='card'>
                    <h4 className='heading p-2'>{title}</h4>
                    <div className='card-body'>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" value={name} onChange={(e) => { setName(e.target.value) }} name="name" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Confirm Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" value={repassword} name="repassword" onChange={(e) => { setRePassword(e.target.value) }} />
                            </div>
                        </div>
                        <div className='conatiner'>
                            <button className='btn btn-outline btn-info' onClick={() => Authenticate(email, password, type, setMessage, navigate, name, repassword)}>{title}</button>
                            <p className='bold'>{message}</p>
                        </div>


                    </div>
                </div>

            </div>
        );
    }

    const signinForm = (title) => {
        return (
            <div className='container mt-5'>
                <div className='card'>
                    <h4 className='heading p-2'>{title}</h4>
                    <div className='card-body'>

                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                        <div className='conatiner'>
                            <button className='btn btn-outline btn-warning' onClick={() => Authenticate(email, password, type, setMessage, navigate)}>{title}</button>
                            <p className='bold'>{message}</p>
                        </div>


                    </div>
                </div>

            </div>
        );

    }



    if (props.type === 'signup') {
        return signupForm(props.title)
    }
    else if (props.type === 'signin') {
        return signinForm(props.title)
    }
}

export default Form;
