import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from '../assets/Images/login.webp'

const Login = ( {setIsLoggedIn}) => {
  return (
        <Template
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your carrer."
            image={loginImg}
            formtype="login"
            setIsLoggedIn={setIsLoggedIn}
        />
  )
}

export default Login