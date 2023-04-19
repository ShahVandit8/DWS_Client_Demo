import { React, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Star from '../../components/Rating-Star/Star';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getITCourses, getMultimediaCourses } from '../../services/api';
import CourseGrid from '../../components/Cards/Courses/CourseGrid';

const Recommendation = ({ Category, id }) => {

    useEffect(() => {
        getcourses();
    }, [])

    const [loading, setLoading] = useState(false)
    const [available, setAvailable] = useState(false)
    const [courses, setCourses] = useState([])
    const slider = useRef(null);
    const slider1 = useRef(null);

    const getcourses = async () => {
        setLoading(true)
        if (Category === 'Information Technology') {
            const result = await getITCourses()
            if (result) {
                setCourses(result.data)
            }
        }
        else if (Category === 'Multimedia') {
            const result = await getMultimediaCourses()
            if (result) {
                setCourses(result.data)
            }
        }
        else {
            setAvailable(true)
        }
        setLoading(false)
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "red" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "green" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },

            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const settings1 = {
        dots: true,
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1424,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },

            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],

        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };


    return (
        <>
            {
                loading ?
                    <></>
                    :
                    available ?
                        <></>
                        :
                        <>
                            <section>
                                <header className="section-header">
                                    <h2>Courses</h2>
                                    <p>Similar Courses</p>
                                </header>
                                <Slider ref={slider} {...settings}>
                                    {
                                        courses.filter((curitem) => curitem._id != id)
                                        .map((item, index) => (
                                            // <CourseGrid id={item._id} Title={item.Name} CoverPicture={process.env.REACT_APP_SERVER_FILE + item.CoverImage} Section={item.Modules.length} Duration={item.Duration} Rating={item.Rating} RatingOutOf={item.RatingOutOf} Price={item.SellingPrice} Level={item.Level} />
                                            <div className='col-12 col-md-11 my-3 text-dark feture-tabs' style={{ color: 'inherit' }}>
                                                <div className="card" style={{ borderRadius: 0 }}>
                                                    <img src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} className="card-img-top" style={{ borderRadius: 0 }} alt="..." />
                                                    <div className="card-body shadow-hover" style={{ border: 'none' }}>
                                                        <div className="row mt-3">
                                                            <div className="col-12">
                                                                <a href={'/course/' + item._id} className='title' style={{ fontSize: '23px', color: 'black' }}><strong>{item.Name}</strong></a>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-12">
                                                                <p>{item.Modules.length} sections • {item.Duration}</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row mt-1">
                                                            <Star rating={item.Rating} size="14px" />
                                                            <span className='mx-2' style={{ color: "#F8B648", fontSize: '17px' }}>{item.Rating}</span>
                                                            <span className='mt-1' style={{ fontSize: '11px' }}>({item.RatingOutOf})</span>
                                                        </div>

                                                        <hr className='my-4' style={{ height: '1%' }} />

                                                        <div className='row p-0'>
                                                            <div className='col-6'>
                                                                <span style={{ fontSize: '17px', fontWeight: '700', fontFamily: 'Nunito' }}>₹{item.SellingPrice}</span>
                                                            </div>
                                                            <div className='col-6 pr-3'>
                                                                <Link className='float-right' to={"/enrollment/" + item._id} style={{ fontSize: '15px', textDecoration: 'none', color: 'inherit' }}><i className='bi bi-cart' style={{ fontSize: '17px' }}></i> &nbsp; Enroll Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </section>
                        </>

            }
        </>
    )
}

export default Recommendation
