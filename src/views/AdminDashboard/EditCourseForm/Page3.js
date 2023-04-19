import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInstructors, editcoursedetails, editInstructorforCourse } from '../../../services/api.js'
import moment from 'moment'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page3 = ({ page, setpage, onValueChange, course, setCourse, modules }) => {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    const { id } = useParams();
    const navigate = useNavigate()

    const CourseDetailsEdit = async (e) => {
        e.preventDefault()
        console.log(course)

        if (course.CoverImage instanceof File) {
            try {
                const formdata = new FormData();
                formdata.append('Name', course.Name);
                formdata.append('CoverImage', course.CoverImage, course.CoverImage.name);
                formdata.append('Category', course.Category);
                formdata.append('ShortDescription', course.ShortDescription);
                formdata.append('Level', course.Level);
                formdata.append('Modules', JSON.stringify(modules));
                formdata.append('LongDescription', course.LongDescription);
                formdata.append('Price', course.Price);
                formdata.append('SellingPrice', course.SellingPrice);
                formdata.append('Instructor', JSON.stringify(course.Instructor));
                formdata.append('Duration', course.Duration);
                formdata.append('StartDate', course.StartDate);
                formdata.append('Timings', course.Timings);

                const courseedit = await editcoursedetails(formdata, id)

                if (courseedit) {
                    toast("✅ Changes have been saved successfully");
                    window.setTimeout(() => navigate(-1), 3000)
                }
            }
            catch (err) {
                toast.error("Error :" + err);
            }
        }
        else {
            try {
                const formdata = new FormData();
                formdata.append('Name', course.Name);
                formdata.append('Category', course.Category);
                formdata.append('ShortDescription', course.ShortDescription);
                formdata.append('Level', course.Level);
                formdata.append('Modules', JSON.stringify(modules));
                formdata.append('LongDescription', course.LongDescription);
                formdata.append('Price', course.Price);
                formdata.append('SellingPrice', course.SellingPrice);
                formdata.append('Instructor', JSON.stringify(course.Instructor));
                formdata.append('Duration', course.Duration);
                formdata.append('StartDate', course.StartDate);
                formdata.append('Timings', course.Timings);

                const courseedit = await editcoursedetails(formdata, id)

                if (courseedit) {
                    toast("✅ Changes have been saved successfully");
                    window.setTimeout(() => navigate(-1), 3000)
                }

            }
            catch (err) {
                toast.error("Error :" + err);
            }
        }


    }

    return (
        <div>
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card" style={{ borderRadius: '0' }}>
                        <div className="card-header">
                            <span className="text-dark">Basic Details</span>
                        </div>
                        <div className="card-body">
                            <div className="container">
                                {/* <div className="row mb-3">
                                        <label htmlFor="Name" className='ml-n2 h6' style={{ fontSize: '15px'}}>Course Name</label>
                                        <input type="text" id="Name" style={{borderRadius : '0', borderWidth: '1px', height:'30px'}} />
                                    </div>
                                    <div className="row mb-2">
                                        <label htmlFor="Name" className='ml-n2 h6 text-center' style={{ fontSize: '13px', marginBottom: '-5px', zIndex:'100', backgroundColor: '#fff', width:'fit-content'}}>Course Name</label>
                                        <input type="text" id="Name" style={{borderRadius : '0', borderWidth: '1px', height:'30px'}} />
                                    </div> */}
                                <form onSubmit={(e) => CourseDetailsEdit(e)}>
                                    <div className="form-group">
                                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Price</span>
                                        {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                        <input
                                            type="text"
                                            className="form-control border-dark"
                                            style={{ borderRadius: '0' }}
                                            id="exampleInputEmail1"
                                            name="Price"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Price"
                                            value={course.Price}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Selling Price</span>
                                        {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                        <input
                                            type="teXt"
                                            className="form-control border-dark"
                                            style={{ borderRadius: '0' }}
                                            id="exampleInputEmail1"
                                            name="SellingPrice"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Selling Price"
                                            value={course.SellingPrice}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                        <small id="emailHelp" className="form-text text-muted">
                                            Write Selling price after discount.
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Duration</span>
                                        {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                        <input
                                            type="text"
                                            className="form-control border-dark"
                                            style={{ borderRadius: '0' }}
                                            id="exampleInputEmail1"
                                            name="Duration"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Course Duration"
                                            value={course.Duration}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Start Date</span>
                                        {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                        <input
                                            type="date"
                                            className="form-control border-dark"
                                            style={{ borderRadius: '0' }}
                                            id="exampleInputEmail1"
                                            name="StartDate"
                                            aria-describedby="emailHelp"
                                            value={moment(course.StartDate).format('yyyy-MM-DD')}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Timing</span>
                                        {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                        <input
                                            type="text"
                                            className="form-control border-dark"
                                            style={{ borderRadius: '0' }}
                                            id="exampleInputEmail1"
                                            name="Timings"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Class Timing"
                                            value={course.Timings}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>

                                    <button onClick={() => setpage(2)} type="button" className="btn btn-dark mt-3 mr-2" style={{ borderRadius: '0' }}>
                                        <i className='bi bi-chevron-left'></i> Back
                                    </button>

                                    <button type="submit" className="btn btn-dark mt-3" style={{ borderRadius: '0' }}>
                                        Edit Course <i className='bi bi-chevron-right'></i>
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Page3