import {React, useState, useEffect} from 'react'

function Page1({ page, setpage, onValueChange, course, setCourse }) {

    useEffect(() => {
        window.scroll(0,0)
        loadImage();
    }, [])

    const [image, setImage] = useState('')
    const [imagename, setImageName] = useState('No File Selected')

    const open_file = () => {
        document.getElementById('input_file').click();
    }

    const imageUpload = (e) => {
        setCourse({ ...course, CoverImage: e.target.files[0]  })
        setImage((URL.createObjectURL(e.target.files[0])))
        setImageName(e.target.files[0].name)
    }

    const NextPage = (e) => {
        e.preventDefault()

        const coursetype = document.getElementById('CourseCategory')
        const level = document.getElementById('Level')

        if(coursetype.value === 'select') {
            alert('Please select Course Category')
        }
        else if (level.value === 'select') {
            alert('Please select Course Level')
        }
        else if (!image) {
            alert('Please select Course Cover Photo')
        }
        else {
            setpage(2)
        }
    }

    const loadImage = () => {
        if(course.CoverImage instanceof File) {
            setImage(URL.createObjectURL(course.CoverImage))
            setImageName(course.CoverImage.name)
        }
    }

    return (
        <div>
            {/* <section> */}
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
                                <form onSubmit={(e) => NextPage(e)}>
                                    <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Course Title</span>
                                        {/* <label htmlFor="exampleInputEmail1">Course Title</label> */}
                                        <input
                                            type="text"
                                            className="form-control border-dark"
                                            style={{ borderRadius: '0' }}
                                            id="Name"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Course Title"
                                            name="Name"
                                            required
                                            value={course.Name}
                                            onChange={(e) => onValueChange(e)}
                                        />
                                        <small id="emailHelp" className="form-text text-muted">
                                            Write a max 60 character course title.
                                        </small>
                                    </div>
                                    <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Course Category</span>
                                        {/* <label htmlFor="CourseCategory">Course Category</label> */}
                                        <select className="form-control border-dark" id="CourseCategory" name="Category" style={{ borderRadius: '0' }} value={course.Category} onChange={(e) => onValueChange(e)} required >
                                            <option value='select'>Select Category</option>
                                            <option value='Information Technology'>Information Technology</option>
                                            <option value="Multimedia">Multimedia</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Short Overview</span>
                                        {/* <label htmlFor="exampleFormControlTextarea1">Short Overview</label> */}
                                        <textarea
                                            style={{ borderRadius: '0' }}
                                            className="form-control border-dark"
                                            id="exampleFormControlTextarea1"
                                            name="ShortDescription"
                                            rows={2}
                                            value={course.ShortDescription}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Level</span>
                                        {/* <label htmlFor="CourseCategory">Level</label> */}
                                        <select className="form-control border-dark" id="Level" name="Level" style={{ borderRadius: '0' }} value={course.Level} onChange={(e) => onValueChange(e)} required>
                                            <option value='select'>Select Level</option>
                                            <option value='Beginner'>Beginner</option>
                                            <option value='Intermediate'>Intermediate</option>
                                            <option value='Advanced'>Advanced</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Long Description</span>
                                        {/* <label htmlFor="exampleFormControlTextarea1">Long Description</label> */}
                                        <textarea
                                            style={{ borderRadius: '0' }}
                                            className="form-control border-dark"
                                            id="exampleFormControlTextarea1"
                                            name="LongDescription"
                                            rows={5}
                                            value={course.LongDescription}
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>

                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Image Preview</span>
                                    <div className="image-tab">
                                        <div className="image-bg">
                                            <div className="image-main">
                                                    <img src={image} className='mx-auto d-block' alt="" />   
                                                {/* <img src={image} className='mx-auto d-block' alt="" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>Add Course Image</span>
                                    <div className="image-upload d-flex">
                                        <input type="file" name="" id='input_file' onChange={imageUpload} hidden />
                                        <div className="col-9 m-0" style={{ backgroundColor: '#F7F9FA', height: '100%', padding: '10px' }}>
                                            <span>{imagename}</span>
                                        </div>
                                        <div className="col-3 m-0 p-0">
                                            <button onClick={open_file} type="button" className='upload-button'>Upload Image</button>
                                        </div>
                                    </div>

                                    <button  type="submit" className="btn btn-dark mt-3" style={{ borderRadius: '0' }}>
                                        Next <i className='bi bi-chevron-right'></i>
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </section> */}
        </div>
    )
}

export default Page1
