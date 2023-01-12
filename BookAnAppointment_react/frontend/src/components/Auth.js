import React from 'react';
import Navbar from './Navbar';
import Form from './Form';


function Auth(props) {
    if (props.type === "signup") {
        return (
            <div>
                <Navbar />

                <Form title="Signup" type="signup" />
            </div>
        )

    }
    else if (props.type === 'signin') {
        return (
            <div>
                <Navbar />

                <Form title="Signin" type="signin" />
            </div>
        )

    }

}

export default Auth;
