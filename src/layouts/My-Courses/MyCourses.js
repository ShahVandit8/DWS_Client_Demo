import { React, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import PageHeading from '../../components/PageHeadings/PageHeading'
import { Link } from 'react-router-dom';
import { getCourses } from '../../services/api';
import Star from '../../components/Rating-Star/Star';

function MyCourses() {

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
                          <div className="row mt-3 m-0 pb-4 border-bottom">
                            <Link className="col-md-3 col-12 p-0 ">
                              <img src={process.env.REACT_APP_SERVER_FILE + item3.CoverImage} alt="" style={{ height: '11rem' }} />
                            </Link>
                            <div className="col-md-6 col-12">
                              <Link to={"/course/" + item3._id} className="row" style={{ fontSize: '20px', color: 'inherit' }}>
                                <span className="pl-0" style={{ fontSize: '13px' }}>Course | {item3.Category}</span>
                                <div className="col-10 p-0">
                                  <span className="" style={{ fontSize: '34px', fontWeight: 'bold' }}>{item3.Name}</span>
                                </div>
                              </Link>
                              <div className="row mt-2">
                                <div className="col-1 p-0 mr-2" style={{ width: 'fit-content' }}>
                                  <span style={{ fontWeight: 'bold', color: '#F8B648' }}>{item3.Rating}</span>
                                </div>
                                <div className="col-8 p-0 mr-2" style={{ width: 'fit-content' }}>
                                  <Star rating={item3.Rating} size="18px" />
                                </div>
                                <div className="col-1 p-0 mr-2" style={{ width: 'fit-content' }}>
                                  <span style={{ fontSize: '13px' }}>({item3.RatingOutOf} reviews)</span>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-12 p-0" style={{ fontSize: '16px' }}>
                                  <span>{item3.Modules.length} sections • {item3.Duration}</span>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-12 p-0">
                                  {
                                    item.Status == "Active" ?
                                      <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item.Status}</span>
                                      :
                                      <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Unknown</span>
                                  }

                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-12 d-md-flex d-inline py-3 px-0 align-items-center">
                              <div className="mx-auto">
                                <Link to={'/my-courses/enrolled/'+ item.Course_id + '/home'} className='btn btn-dark' style={{borderRadius: '0'}}>Go to Course &rarr;</Link>
                              </div>
                            </div>
                          </div>
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
                  <span style={{ fontSize: '16px', color: '#000' }}>When you enroll in a course, it will appear here. <Link>Browse now</Link>.</span>
                </div>
              </div>
        }
      </section>
    </div>
  )
}

export default MyCourses
