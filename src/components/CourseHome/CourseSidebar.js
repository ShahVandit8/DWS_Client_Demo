import { React, useEffect, useState } from 'react'
import { NavHashLink } from 'react-router-hash-link'
import { useParams } from 'react-router-dom'
import { getCoursesByID } from '../../services/api.js'
import jwtDecode from 'jwt-decode'

const CourseSidebar = () => {

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
                setUser(userdets)

                if (userdets.Courses) {
                    const courseexisit = userdets.Courses.filter(item => item.Course_id == id)
                    console.log("Courselist : " + courseexisit)
                    if (courseexisit.length < 1) {
                        // console.log("Not match")
                        window.location.replace('/')
                    }
                    else if(courseexisit[0].Status == 'Terminated') {
                        alert('Sorry your Enrollment is Terminated')
                        window.location.replace('/')
                    }
                }

            }
        }
        else {
            window.location.replace('/authentication/sign-in')
            // navigate('/authentication/sign-in')
        }
        getCourseDetails();
        setLoading(false)

    }, [])

    const [course, setCourse] = useState({})
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const { id } = useParams();

    const getCourseDetails = async () => {
        const result = await getCoursesByID(id)
        setCourse(result.data)
        console.log(result.data)
    }

    return (
        <div className="col-lg-2 col-12 card1 border-md-0 p-0">
            <div className="card-body p-0">
                <div className="p-4">
                    <img src={process.env.REACT_APP_SERVER_FILE + course.CoverImage}  className='img-fluid d-block mx-auto' alt="" />
                    <h2 className="text-center mt-3" style={{fontSize: '22px'}}>{course.Name}</h2>
                    <h2 className="text-center mt-1" style={{fontSize: '12px', fontWeight: '400'}} >{course.Category}</h2>
                </div>
                <div className="sidebar-nav">
                    <ul>
                        <NavHashLink className="nav-link" to="home"><li>Home</li></NavHashLink>
                        <NavHashLink className="nav-link" to="attendance"><li>Attendance</li></NavHashLink>
                        <NavHashLink className="nav-link" to="resources"><li>Resources</li></NavHashLink>
                        {/* <li>Close account</li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CourseSidebar
