import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Star from '../../components/Rating-Star/Star'
import { getCoursesByID } from '../../services/api'
import Loading from '../../layouts/LoadingScreen/Loading'

const Enrollment = () => {

    useEffect(() => {
        window.scroll(0, 0)
        getCourseDetails();
    }, [])

    const [course, setCourse] = useState({})
    const [image, setImage] = useState('/img/javascript.jpg')
    const [module, setModule] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();

    const getCourseDetails = async () => {
        setLoading(true)
        const coursedetails = await getCoursesByID(id)
        setCourse(coursedetails.data)
        setImage(process.env.REACT_APP_SERVER_FILE + coursedetails.data.CoverImage)
        setModule(coursedetails.data.Modules)
        setLoading(false)
    }

    const gotoCheckOut = (id) => {
        navigate('/checkout/' + id)
    }

    return (
        <>
            <section className="checkout">
                {
                    loading ?
                        <Loading />
                        :
                        <div className="container">
                            <div className="row my-3">
                                <h1>Enrollment</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <span>Course</span>
                                    </div>
                                    <hr className="my-1 border-0" />

                                    <div className="card" style={{ border: 'none', borderRadius: '0' }}>
                                        <div className="card-body px-0">
                                            <div className="row">
                                                <div className="col-md-2 col-12">
                                                    <img src={process.env.REACT_APP_SERVER_FILE + course.CoverImage} alt="" className="img-fluid" />
                                                </div>
                                                <div className="col-md-6 col-12 px-4">
                                                    <Link to={"/course/" + course._id} className="row mb-0" style={{ fontSize: '20px', color: 'inherit' }}>
                                                        <span className="pl-0" style={{ fontSize: '13px' }}>Course | {course.Category}</span>
                                                        <div className="col-10 p-0">
                                                            <span className="" style={{ fontSize: '28px', fontWeight: 'bold' }}>{course.Name}</span>
                                                        </div>
                                                        <div className="p-0 mt-n2">
                                                            <span style={{ fontSize: '12px' }}>{module.length} sections • {course.Duration}</span>
                                                        </div>
                                                        <div className="p-0 mb-2">
                                                            {/* {
                                                                item.Status == "Active" ?
                                                                    <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>{item.Status}</span>
                                                                    :
                                                                    <span className="badge" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Unknown</span>
                                                            } */}
                                                        </div>

                                                    </Link>

                                                </div>
                                                <div className="col-md-4 float-right col-12  my-auto d-inline align-items-center">
                                                    <div className="text-md-right">
                                                        <span className='text-right' style={{ borderRadius: '0', fontWeight: 'bold', color: '#A335EF', fontSize: '20px' }}>₹{course.SellingPrice}<i className='bi bi-tag-fill'></i> </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="row mt-3 m-0">
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
                                    </div> */}

                                    
                                </div>

                                <div className="col-md-4 mx-0 pl-md-5 pr-md-5 mt-md-0 mt-3 d-flex">
                                    <div className="container p-0">
                                        <div className="row pl-0">
                                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#6A6F73' }}>Total: </span>
                                        </div>
                                        <div className="row">
                                            <span style={{ fontSize: '30px', fontWeight: 'bold' }}>₹{course.SellingPrice}</span>
                                        </div>
                                        <div className="row p-0 mt-3">
                                            <button onClick={() => gotoCheckOut(course._id)} className='btn btn-dark' style={{ borderRadius: '0', height: '45px', fontWeight: 'bold' }}>Checkout</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                }
            </section>
        </>
    )
}

export default Enrollment
