import { React, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import { addenrollment, getCoursesByID } from '../../services/api'
import moment from 'moment'
import Star from '../../components/Rating-Star/Star'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading'

const Checkout = () => {

    const [login, setlogin] = useState(false)
    const [user, setUser] = useState({})
    const [userid, setUserid] = useState("")
    const [course, setCourse] = useState({})
    const [module, setModule] = useState([])
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    // const [enrollment, setEnrollment] = useState({
    //     Student_id: 0,
    //     Course_id: '',
    //     Enrollment_date: '',
    //     Course_StartDate: '',
    //     Amount: '',
    // })

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0,0)
        setLoading(true)
        const token = sessionStorage.getItem('UserToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('UserToken')
                setlogin(false)
            }
            else {
                const userDetails = sessionStorage.getItem('User');
                const userdets = JSON.parse(userDetails)
                setUser(userdets)
                setUserid((userdets._id))
                setlogin(true)
            }
        }
        else {
            setlogin(false)
        }

        getCourseDetails()
    }, [])

    const getCourseDetails = async () => {
        const coursedetails = await getCoursesByID(id)
        setCourse(coursedetails.data)
        setModule(coursedetails.data.Modules)
        setImage(process.env.REACT_APP_SERVER_FILE + coursedetails.data.CoverImage)
        setLoading(false)
        // setEnrollment({ ...enrollment, Course_id: coursedetails.data._id, Course_StartDate: coursedetails.data.StartDate, Amount: coursedetails.data.SellingPrice, Enrollment_date: Date() })
    }

    const enroll = async () => {

        const enrollment = {
            Student_id: userid,
            Course_id: course._id,
            Enrollment_date: Date(),
            Course_StartDate: course.StartDate,
            Amount: course.SellingPrice,
        }

        console.log(enrollment)

        const addenroll = await addenrollment(enrollment)

        if (addenroll.data.enrollmentdetails) {

            const UserToken = addenroll.data;
            const userdetails = UserToken.user;
            console.log(UserToken.usertoken)

            if (UserToken.usertoken) {
                sessionStorage.setItem('UserToken', UserToken.usertoken)
                sessionStorage.setItem('User', JSON.stringify(userdetails))
            }

            const enrollmentid = addenroll.data.enrollmentdetails._id
            toast("✅ Succesfully Enrolled");
            window.setTimeout((e) => gotoConfirm(enrollmentid), 1000)
        }
        else {
            alert("Error")
        }
    }

    const gotoConfirm = (id) => {
        navigate('/enrollment-success/' + id)
    }

    return (
        <>
            <section className="checkout">
                {
                    loading ?
                        <Loading />
                        :
                        <div className="container">
                            {
                                login === false ?
                                    <div className="row text-center">
                                        <h1>Checkout</h1>
                                        <span>Please Login First</span>
                                        <span className='mt-1'> <Link>Login</Link> • <Link>Sign Up</Link> </span>
                                    </div>
                                    :
                                    <>
                                        <div className='row'>
                                            <h1>Checkout</h1>

                                            <div className="col-md-8 col-12">

                                                <div className="card" style={{ borderRadius: '0' }}>
                                                    <div className="card-header row m-0 py-2 bg-dark text-white" style={{ borderRadius: '0' }} >
                                                        <div className="col-12 col-md-8 p-0">
                                                            <span className="align-middle">User Details</span>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div>
                                                            <div className="mb-3">
                                                                <label className="small mb-1" htmlFor="inputName">Full Name</label>
                                                                <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputName" name="Name" type="text" value={user.Name} readOnly />
                                                            </div>

                                                            <div className="row gx-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                                    <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputEmail" type="text" value={user.Email} readOnly />
                                                                </div>
                                                                {/* Form Group (last name)*/}
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputDOB">Date of Birth</label>
                                                                    <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputDOB" type="date" value={moment(user.DOB).format('yyyy-MM-DD')} readOnly />
                                                                </div>
                                                            </div>
                                                            {/* Form Row        */}
                                                            <div className="row gx-3 mb-3">
                                                                {/* Form Group (organization name)*/}
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputContact">Contact No</label>
                                                                    <input className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} id="inputContact" type="text" value={user.Contact} readOnly />
                                                                </div>
                                                                {/* Form Group (location)*/}
                                                                <div className="col-md-6">
                                                                    <label className="small mb-1" htmlFor="inputGender">Gender</label>
                                                                    <select name="Gender" id="inputGender" className="form-control" style={{ backgroundColor: 'white', borderRadius: '0' }} value={user.Gender} required readOnly>
                                                                        <option value="select" selected>Select Gender</option>
                                                                        <option value="Male">Male</option>
                                                                        <option value="Female">Female</option>
                                                                        <option value="Other">Other</option>
                                                                    </select>
                                                                    {/* <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" defaultValue="San Francisco, CA" /> */}
                                                                </div>
                                                            </div>


                                                            <div className=" gx-3 mb-3">
                                                                <label className="small mb-1" htmlFor="inputInstitute">Address</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    name="Address"
                                                                    style={{ backgroundColor: 'white', borderRadius: '0' }}
                                                                    placeholder="Address"
                                                                    rows='5'
                                                                    required
                                                                    value={user.Address}
                                                                    readOnly
                                                                // onChange={(e) => onValueChange(e)}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card mt-3" style={{ borderRadius: '0' }}>
                                                    <div className="card-header row m-0 py-2 bg-dark text-white" style={{ borderRadius: '0' }}>
                                                        <div className="col-12 p-0">
                                                            <span className="align-middle">Enrollment Details</span>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row m-0">
                                                            <Link className="col-md-2 col-12 p-0 ">
                                                                <img src={image} alt="" style={{ height: '4.5rem' }} />
                                                            </Link>
                                                            <div className="col-md-10 col-12">
                                                                <Link to={"/course/" + course._id} className="row" style={{ fontSize: '20px', color: 'inherit' }}>
                                                                    <div className="col-md-10 col-6 p-0">
                                                                        <span className="" style={{ fontWeight: 'bold' }}>{course.Name}</span>
                                                                    </div>
                                                                    <div className="col-md-2 col-6 p-0">
                                                                        <span className='float-right' style={{ fontWeight: 'bold', color: '#A335EF' }}>₹{course.SellingPrice} <i className='bi bi-tag-fill'></i></span>
                                                                    </div>
                                                                </Link>
                                                                <div className="row">
                                                                    <div className="col-1 p-0 mr-2" style={{ width: 'fit-content' }}>
                                                                        <span style={{ fontWeight: 'bold', color: '#F8B648' }}>{course.Rating}</span>
                                                                    </div>
                                                                    <div className="col-8 p-0 mr-2" style={{ width: 'fit-content' }}>
                                                                        <Star rating={course.Rating} />
                                                                    </div>
                                                                    <div className="col-1 p-0 mr-2" style={{ width: 'fit-content' }}>
                                                                        <span style={{ fontSize: '13px' }}>({course.RatingOutOf} reviews)</span>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12 p-0" style={{ fontSize: '13px' }}>
                                                                        <span>{module.length} sections • {course.Duration}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-md-4 col-12">
                                                <div className="card" style={{ borderRadius: '0' }}>
                                                    <div className="card-header row m-0 py-2 bg-dark text-white" style={{ borderRadius: '0' }} >
                                                        <div className="col-12 col-md-8 p-0">
                                                            <span className="align-middle">Payment Details</span>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <span style={{ fontSize: '25px' }}>Summary</span>
                                                        <table className='w-100 mt-2'>
                                                            <tr>
                                                                <td className='float-left'>Original Price</td>
                                                                <td className='float-right'>₹ {course.Price}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className='float-left'>Discounts</td>
                                                                <td className='float-right'>-₹ {(course.Price) - (course.SellingPrice)}</td>
                                                            </tr>
                                                            <hr className='my-2' style={{ height: '1%' }} />
                                                            <tr>
                                                                <td className='float-left' style={{ fontWeight: 'bold' }}>Total</td>
                                                                <td className='float-right' style={{ fontWeight: 'bold' }}>₹ {course.SellingPrice}</td>
                                                            </tr>
                                                        </table>
                                                        <div className="mt-3 w-100">
                                                            <button onClick={() => enroll()} className="btn text-white w-100" style={{ borderRadius: '0', height: '50px', fontWeight: 'bold', backgroundColor: '#7f11e0' }}>Complete Checkout</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* <button onClick={enroll} className='btn btn-dark mx-auto' style={{ width: 'fit-content', borderRadius: '0' }} > Enroll </button> */}
                                        </div>
                                    </>
                            }


                        </div>
                }
            </section>

            <ToastContainer
                position="top-center"
                autoClose={1000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Checkout
