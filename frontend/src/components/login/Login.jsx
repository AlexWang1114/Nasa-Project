import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'; // Import SweetAlert

import backgroundImage from '../../assets/BGMain.jpg';

const Login = () => {
    const  [data, setData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState("");

    const handleChange = ({currentTarget:input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const backend_url = import.meta.env.VITE_BACKEND_URL; // Make sure this is configured in your environment
            console.log("this is backend url", backend_url);
            const url = backend_url + "/api/v1/auth";
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token",res.data)

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });

            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.log(error.response.data.message);
            }{
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.login_container}  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login To Your Account</h1>
                        
                        <input type='email' placeholder='Email'
                         name='email' onChange={handleChange} 
                         value={data.email} required className={styles.input} />

                        <input type='password' placeholder='Password'
                         name='password' onChange={handleChange} 
                         value={data.password} required className={styles.input} />

                        {error && <div className={styles.error_msg}>{error}</div>}

                         <button type="submit" className={styles.green_btn}>
                            Sign In
                         </button>

                    </form>
                </div>    
                <div className={styles.right}>
                <h1>New Hear?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                        Sign Up
                        </button>
                    </Link>
                    
                </div>    
            </div>
        </div>
    );


}
export default Login;

