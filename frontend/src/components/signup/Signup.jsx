import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'; // Import SweetAlert

import backgroundImage from '../../assets/BGMain.jpg';

const Signup = () => {
    const  [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({currentTarget:input}) => {
        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const backend_url = import.meta.env.VITE_BACKEND_URL; // Make sure this is configured in your environment
            const url = backend_url + "/api/v1/users";
            const {data: res} = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);

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
                title: "Signed up successfully"
              });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.log(error.response.data.message);
            }{
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.signup_container} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className={styles.white_btn}>
                        Sign In
                        </button>
                    </Link>
                </div>    
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type='text' placeholder='First Name'
                         name='firstName' onChange={handleChange} 
                         value={data.firstName} required className={styles.input} />

                        <input type='text' placeholder='Last Name'
                         name='lastName' onChange={handleChange} 
                         value={data.lastName} required className={styles.input} />

                        <input type='email' placeholder='Email'
                         name='email' onChange={handleChange} 
                         value={data.email} required className={styles.input} />

                        <input type='password' placeholder='Password'
                         name='password' onChange={handleChange} 
                         value={data.password} required className={styles.input} />

                        {error && <div className={styles.error_msg}>{error}</div>}

                         <button type="submit" className={styles.green_btn}>
                            Sign Up
                         </button>

                    </form>
                </div>    
            </div>
        </div>
    );


}
export default Signup;

