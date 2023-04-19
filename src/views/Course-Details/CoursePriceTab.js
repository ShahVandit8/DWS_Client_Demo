import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import jwtDecode from 'jwt-decode'

function CoursePriceTab(props) {


    useEffect(() => {
        setLoading(true)
        const token = sessionStorage.getItem('UserToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('UserToken')
            }
            else {
                const userDetails = sessionStorage.getItem('User');
                const userdets = JSON.parse(userDetails)
                setCourseList(userdets.Courses)

                const list = userdets.Courses.filter((item) => item.Course_id == id)
                if (list.length > 0) {
                    setUserEnrolled(true)
                }
            }
        }
        setLoading(false)
    }, [])

    const [courselist, setCourseList] = useState([])
    const [userenrolled, setUserEnrolled] = useState(false)
    const [loading, setLoading] = useState(false)

    const { id, Price, Sellingprice, CoverImage, StartDate } = props

    const navigate = useNavigate()

    const gotoEnrollment = () => {
        navigate('/enrollment/'+id)
    }

    const gotoCourse = () => {
        navigate('/my-courses/enrolled/'+ id + '/home')
    }

    return (
        <>
            <div className='card'>
                <img className="card-img-top" src={process.env.REACT_APP_SERVER_FILE + CoverImage} alt="Card image cap" />
                <div className='card-body'>
                    <div className='price-tab'>
                        <span className="price mr-2">₹{Sellingprice}</span>
                        <span className="text-muted"><del>₹{Price}</del></span>
                    </div>
                    <div className='my-2'>
                        <span className="text-dark">Next Batch Starts on: <strong>{moment(StartDate).format('LL')}</strong></span>
                    </div>
                    <div className='my-2'>
                        <span className="text-dark">Classes Location: 1/A, Satyam Apartment, RC Dutt
                            Rd, Vishwas Colony, Alkapuri.</span>
                    </div>

                    {
                        loading ?
                            <span>Loading...</span>
                            :
                            userenrolled ?
                            <>
                            <span className='text-dark' style={{fontSize:"12px", backgroundColor: 'rgba(117, 79, 254, 0.2)'}}>You have already enrolled in this course</span>
                            <button onClick={()=>gotoCourse()} className="enroll-button">Go to Course <span className='bi bi-arrow-right my-auto'></span> </button>
                            </>
                                
                                :
                                <button onClick={()=>gotoEnrollment()} className="addtocart-button">Enroll Now</button>
                    }

                </div>
            </div>

            <div className='card mt-4'>
                <div className='card-header bg-white p-3'>
                    <span className="text-dark" style={{ fontWeight: 'bold' }}>What's Included</span>
                </div>
                <div className='card-body text-dark p-0'>
                    <div className='row p-3'>
                        <div className='col-1'>
                            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#A435F0' }} className='bi bi-award-fill'></span>
                        </div>
                        <div className='col-11'>
                            Certificate on Completion
                        </div>
                    </div>
                    <hr style={{ margin: 0, border: '2px' }} />
                    <div className='row p-3 mt-2'>
                        <div className='col-1'>
                            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#A435F0' }} className='bi bi-book-half'></span>
                        </div>
                        <div className='col-11'>
                            Course Resourses
                        </div>
                    </div>
                    <hr style={{ margin: 0, border: '2px' }} />
                    <div className='row p-3 mt-2'>
                        <div className='col-1'>
                            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#A435F0' }} className='bi bi-question-circle-fill'></span>
                        </div>
                        <div className='col-11'>
                            One on One Training
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CoursePriceTab.defaultProps = {
    CoverImage: 'img/python.jpg'
}

export default CoursePriceTab
