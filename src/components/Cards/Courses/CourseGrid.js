import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Star from '../../Rating-Star/Star';

function CourseGrid(props) {

    const { id, CoverPicture, Level, Title, Section, Duration, Rating, RatingOutOf, Price } = props;

    const [color, setColor] = useState('')
    const [bgcolor, setBgColor] = useState('')
    const [courses, setCourses] = useState([])

    useEffect(() => {
        LevelColor();
        checkEnrollment();
    }, [])

    const LevelColor = () => {
        if (Level === 'Beginner') {
            setColor('#38A169')
            setBgColor('#EBF5F0')
        }
        else if (Level === 'Intermediate') {
            setColor('#22AAED')
            setBgColor('#E6F6FD')
        }
        else if (Level === 'Advanced') {
            setColor('#DC2626')
            setBgColor('#FBE9E9')
        }
    }

    const checkEnrollment = async () => {
        const userDetails = sessionStorage.getItem('User');
        const userdets = JSON.parse(userDetails)
        setCourses(userdets.Courses)
    }

    return (
        <div className='col-10 col-sm-6 col-lg-3 mb-3 feture-tabs'>
            <div className="card" style={{ borderRadius: 0 }}>
                <img src={CoverPicture} className="card-img-top" style={{ borderRadius: 0 }} alt="..." />
                <div className="card-body shadow-hover" style={{ border: 'none' }}>
                    <div className="row">
                        <div className="col-6">
                            <span className="badge" style={{ borderRadius: 3, backgroundColor: bgcolor, color: color, fontWeight: '300' }}>{Level}</span>
                        </div>
                        <div className="col-6 text-right">
                            <i className="bi bi-heart" style={{ color: "#212529", fontSize: '15px' }} />

                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <Link to={'/course/' + id} className='title' style={{ fontSize: '23px' }}><strong>{Title}</strong></Link>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <p>{Section} sections • {Duration}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row mt-3">
                        <Star rating={Rating} size="14px" />
                        <span className='mx-2' style={{ color: "#F8B648", fontSize: '17px' }}>{Rating}</span>
                        <span className='mt-1' style={{ fontSize: '11px' }}>({RatingOutOf})</span>
                    </div>

                    <hr className='my-4' style={{ height: '1%' }} />

                    <div className='row p-0'>
                        <div className='col-6'>
                            <span style={{ fontSize: '17px', fontWeight: '700', fontFamily: 'Nunito' }}>₹{Price}</span>
                        </div>
                        <div className='col-6 pr-3'>
                            {
                                courses.length ?
                                    courses.filter((item) => item.Course_id === id).length ?
                                        <Link className='float-right' to={"/my-courses/enrolled/" + id + "/home"} style={{ fontSize: '15px', textDecoration: 'none', color: 'inherit' }}><i className='bi bi-arrow-right' style={{ fontSize: '17px' }}></i>Go to course</Link>
                                        :
                                        <Link className='float-right' to={"/enrollment/" + id} style={{ fontSize: '15px', textDecoration: 'none', color: 'inherit' }}><i className='bi bi-cart' style={{ fontSize: '17px' }}></i>Enroll</Link>
                                    // .map((item2) => (
                                    //     <Link className='float-right' to={"/enrollment/" + id} style={{ fontSize: '15px', textDecoration: 'none', color: 'inherit' }}><i className='bi bi-arrow-right' style={{ fontSize: '17px' }}></i>Go to course</Link>
                                    // ))
                                    :
                                    <Link className='float-right' to={"/enrollment/" + id} style={{ fontSize: '15px', textDecoration: 'none', color: 'inherit' }}><i className='bi bi-cart' style={{ fontSize: '17px' }}></i>Enroll</Link>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CourseGrid.defaultProps = {
    CoverPicture: "img/python.jpg",
    Title: "The Python Course: build web application",
    // Level: 'Intermediate',
    Section: "12",
    Duration: '10 Weeks',
    Rating: '4.0',
    RatingOutOf: '300',
    Price: '2000'
}

export default CourseGrid
