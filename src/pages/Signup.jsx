import React from 'react'
import Template from '../components/core/Auth/Template'
import signupImg from '../assets/Images/signup.webp'

const Signup = ( {setIsLoggedIn} ) => {
  return (
    <Template
            title="Join the millions learning to code with EduLearn for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your carrer."
            image={signupImg}
            formtype="signup"
            setIsLoggedIn={setIsLoggedIn}
        />
  )
}

export default Signup