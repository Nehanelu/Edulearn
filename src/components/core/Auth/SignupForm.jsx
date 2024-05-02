import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

const SignupForm = ( {setIsLoggedIn} ) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //student or Instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData
    
    // handle input fields, when same value changes
    function handleOnChange(event) {
        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name] : event.target.value,
            }
        ))
    }

    //form submission handler
    function handleOnSubmit(event) {
        event.preventDefault();
        if(formData.password != formData.confirmPassword){
            toast.error("Password do not match");
            console.log("not match");
            return;
        }
        const signupData = {
            ...formData,
            accountType,
        }
        // setIsLoggedIn(true);
        // toast.success("Account Created");
        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
            setAccountType(ACCOUNT_TYPE.STUDENT)
        }

  return (
    <div>
        {/* student- instructor tabs */}
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button 
            className={`${accountType === "student" 
             ?
                  "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType("student")}>
                Student
            </button>
            <button
            className={`${accountType === "instructor" 
            ?
                 "bg-richblack-900 text-richblack-5"
               : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`} 
            onClick={() => setAccountType("instructor")}>
                Instructor
            </button>
        </div>

        <form onSubmit={handleOnSubmit}>
            {/* first name and lastname  */}
            <div className='flex gap-x-4 mt-4'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        First Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type='text'
                        name='firstName'
                        onChange={handleOnChange}
                        placeholder='Enter First Name'
                        value={formData.firstName}
                        className='bg-richblue-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                    />
                </label>

                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Last Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type='text'
                        name='lastName'
                        onChange={handleOnChange}
                        placeholder='Enter Last Name'
                        value={formData.lastName}
                        className='bg-richblue-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                    />
                </label>
            </div>

            <div className='mt-4'>
                <label className='w-full mt-4'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Email Address<sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type='email'
                            name='email'
                            onChange={handleOnChange}
                            placeholder='Enter Email Address'
                            value={formData.email}
                            className='bg-richblue-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />
                </label>
            </div>

            {/* create password and confirm password  */}
            <div className='flex gap-x-4 mt-4'>
                <label className='relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Create Password<sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? ('text') : ('password')}
                            name='password'
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            value={formData.password}
                            className='bg-richblue-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />

                        <span 
                        className='absolute right-3 top-[38px] cursor-pointer'
                        onClick={() => setShowPassword( (prev) => !prev)}>
                            {showPassword ? 
                                            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                                            (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                                }
                        </span>
                </label>

                <label className='relative'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                            Confirm Password<sup className='text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? ('text') : ('password')}
                            name='confirmPassword'
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            className='bg-richblue-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'

                        />

                        <span 
                        className='absolute right-3 top-[38px] cursor-pointer'
                        onClick={() => setShowConfirmPassword( (prev) => !prev)}>
                            {showConfirmPassword ? 
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                            }
                        </span>
                </label>
            </div>

            <button type='submit' className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-5'>
                Create Account
            </button>
        </form>
    </div>
  )
}

export default SignupForm;