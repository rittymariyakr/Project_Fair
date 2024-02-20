import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthTokenContext } from '../contexts/ContextShare';


function Auth({ register }) {
    const { isAuthorized, setIsAuthorized } = useContext(AuthTokenContext)


    //create a state to hold the value of user reistration 
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userData);

    const navigate = useNavigate()

    //function to register
    const handleRegister = async (e) => {
        e.preventDefault()

        const { username, email, password } = userData

        if (!username || !email || !password) {
            toast.info('please fill the form completely')
        }
        else {
            const result = await registerAPI(userData)
            console.log(result.data);
            if (result.status === 200) {
                toast.success(`${result.data.username} is successfully registerd`)
                //empty the form after regidtrstion
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                //naviagte to login page
                navigate('/login')
            }
            else {
                toast.error(result.response.data)
            }
        }
    }


    const registerForm = register ? true : false

    //function to login
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = userData

        if (!email || !password) {
            toast.info('Please fill the form completely')
        }
        else {
            //api call
            const result = await loginAPI(userData) //here userData has the body of contents. so give userData as body
            console.log(result);

            if (result.status === 200) {
                //alert
                toast.success('Login Successfull')
                setIsAuthorized(true)
                //store in session Storage
                //JSON.stringify is used to convert json format to string
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)

                //empty the state (field empty)
                setUserData({
                    email: "",
                    password: ""
                })
                //navigate to home

                setTimeout(() => {
                    navigate('/')
                }, 2500)

            }
            else {
                toast.error(result.response.data)
            }

        }
    }

    return (
        <>
            <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
                <div className="w-75 container">

                    <Link className='fs-5' style={{ color: 'blue', textDecoration: 'none' }} to={'/'}><i class="fa-solid fa-arrow-left ms-2"></i>Go back to home</Link>
                    <div className='card p-5 rounded' style={{ backgroundColor: '#28C1B8' }}>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="no image" width={'100%'} />

                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <h1 className='text-white'><i class="fa-brands fa-stack-overflow fa-2x"></i>Project Fair</h1>
                                    <h5 className='text-white ms-5 mt-4'>
                                        {
                                            registerForm ? "sign Up to your Account" : "Sign In to Your Account"
                                        }
                                    </h5>
                                    <Form className='mt-5 w-100'>
                                        {registerForm &&
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control onChange={(e) => setUserData({ ...userData, username: e.target.value })} value={userData.username} type="text" placeholder="Username" />
                                            </Form.Group>
                                        }
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} type="email" placeholder="Enter your Email Id" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} type="password" placeholder="Enter your password" />
                                        </Form.Group>
                                        {registerForm ?
                                            <div className='mt-4'>
                                                <button onClick={handleRegister} className='btn btn-warning rounded'>Register</button>
                                                <p>Already a User? Click here to <Link to={'/login'} style={{ color: 'blue' }}>Login</Link></p>

                                            </div> :
                                            <div className='mt-4'>
                                                <button onClick={handleLogin} className='btn btn-warning rounded'>login</button>
                                                <p>New User? Click here to <Link to={'/register'} style={{ color: 'blue' }}>Register</Link></p>

                                            </div>
                                        }
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default Auth
