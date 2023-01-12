import Request from '../Actions/Request';
import axios from 'axios';
import { config } from '../Services/Constants';



export async function Authenticate(email, password, type, setMessage, navigate, name, repassword) {
    if (type === 'signup') {
        let data = { name, email, password, repassword, type };

        const body = JSON.stringify(data);

        const res = await axios.post(Request.auth, body, config);
        if (res.data.status !== 200) {
            setMessage(res.data.error);
        } else {
            navigate("/signin");
        }
    }
    else if (type === 'signin') {
        let data = { email, password, type };

        const body = JSON.stringify(data);

        const res = await axios.post(Request.auth, body, config);

        if (res.data.status !== 200) {
            setMessage(res.data.error);
        } else {
            localStorage.setItem('isAutenticated', true);
            localStorage.setItem('user', res.data.name);
            localStorage.setItem('userEmail', res.data.username);
            navigate("/dashboard");
        }
    }
}