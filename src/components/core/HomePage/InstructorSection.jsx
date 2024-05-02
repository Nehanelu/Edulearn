import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div  className='flex flex-row gap-20 items-center'>
          
            <div className='w-[50%]'>
                <img
                    src={Instructor}
                    alt='InstructorImage'
                    className='shadow-white'
                />
            </div>

            <div className='flex flex-col gap-10 w-[50%]'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an 
                    <HighlightText text={"Instructor"} />
                </div>

                <p className='font-medium text-[16px] w-[75%] text-richblack-300'>
                  Instructor from around the world teach millions of students on EduLearn. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center'>
                            Start learning Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default InstructorSection