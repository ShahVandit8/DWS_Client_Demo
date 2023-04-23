import { React, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../components/PageHeadings/PageHeading'
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/api';
import Star from '../../components/Rating-Star/Star';
import moment from 'moment';

function MyCourses() {

  useEffect(() => {
    window.scroll(0, 0)
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
        setCourseList(userdets.Courses)

      }
    }
    else {
      window.location.replace('/authentication/sign-in')
      // navigate('/authentication/sign-in')
    }
    getAllCourses();
    setLoading(false)
  }, [])

  const [user, setUser] = useState({});
  const [courselist, setCourseList] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  const getAllCourses = async () => {
    const result = await getCourses();
    setCourses(result.data)
  }

  return (
    <div>
      <PageHeading Title="My Courses" Description="" />
      <section id="my-course" className="my-course container">
        {
          loading ?
            <></>
            :
            courselist.length ?
              // <div className="container">
              //   <div className='text-center'>
              //     <span style={{ fontSize: '20px', color: '#000', fontWeight: 'bold' }}>Yes Enrolled</span> <br />
              //   </div>
              // </div> 
              <>
                <div className="row">
                  <div className="col-md-12 col-12">
                    <div className="row">
                      <span>Course</span>
                    </div>
                    <hr className="my-1 border-0" />

                    {
                      courselist.map(item => (
                        courses.filter((item2) => item2._id == item.Course_id).map(item3 => (
                          <>
                            <div className="card border-bottom" style={{ border: 'none', borderRadius: '0' }}>
                              <div className="card-body px-0">
                                <div className="row">
                                  <div className="col-md-2 col-12">
                                    <img src={process.env.REACT_APP_SERVER_FILE + item3.CoverImage} alt="" className="img-fluid" />
                                  </div>
                                  <div className="col-md-6 col-12 px-4">
                                    <Link to={"/course/" + item3._id} className="row mb-0" style={{ fontSize: '20px', color: 'inherit' }}>
                                      <span className="pl-0" style={{ fontSize: '13px' }}>Course | {item3.Category}</span>
                                      <div className="col-10 p-0">
                                        <span className="" style={{ fontSize: '28px', fontWeight: 'bold' }}>{item3.Name}</span>
                                      </div>
                                      <div className="p-0 mt-n2">
                                        <span style={{ fontSize: '12px' }}>Enrollment Date : {moment(item.Enrollment_date).format('DD-MM-yyyy')}</span>
                                      </div>
                                      <div className="p-0 mb-2">
                                        {
                                          item.Status == "Active" ?
                                            <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item.Status}</span>
                                            :
                                            item.Status == "Passed Out" ?
                                              <span className="badge" style={{ fontSize: '13px', backgroundColor: 'rgba(117, 79, 254, 0.1)', color: '#754FFE', borderRadius: '0' }}>{item.Status}</span>
                                              :
                                              item.Status == "Terminated" ?
                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#FBE9E9', color: '#DC2626', borderRadius: '0' }}>{item.Status}</span>
                                                :
                                                <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item.Status}</span>
                                        }
                                      </div>

                                    </Link>

                                  </div>
                                  <div className="col-md-3 col-12 d-md-flex d-inline align-items-center">
                                    <div className="mx-auto">
                                      {
                                        item.Status == "Terminated" ?
                                          <><span className="text-dark">Sorry your enrollment is Terminated</span></>
                                          :
                                          <Link to={'/my-courses/enrolled/' + item.Course_id + '/home'} className='btn btn-dark' style={{ borderRadius: '0' }}>Go to Course &rarr;</Link>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))
                      ))
                    }
                  </div>
                </div>
              </>
              :
              <div className="container">
                <div className='text-center'>
                  <span style={{ fontSize: '20px', color: '#000', fontWeight: 'bold' }}>Enroll in any from over 21 courses.</span> <br />
                  <span style={{ fontSize: '16px', color: '#000' }}>When you enroll in a course, it will appear here. <Link to="/all-courses" >Browse now</Link>.</span>
                </div>
              </div>
        }
      </section>
    </div>
  )
}

export default MyCourses
