import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStudentsAsPerCourse, getCoursesByInstructorId, getStudentsAsMultipleCourse } from '../../services/api.js'
import Loading from '../../layouts/LoadingScreen/Loading.js'

const Students = () => {

    useEffect(() => {
        getAllCourses();
    }, [])

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [student, setStudent] = useState([])
    // const [course, setCourse] = useState
    const [search, setSearch] = useState("");

    const getAllCourses = async () => {
        setLoading(true)
        const userDetails = sessionStorage.getItem('Instructor');
        const userDets = JSON.parse(userDetails)
        let allCourse = await getCoursesByInstructorId(userDets._id);
        console.log(allCourse.data);

        if (allCourse.data) {
            const array = []
            const result1 = await allCourse.data.map(item => {
                array.push(item._id)
                // setArray(oldArray => [...oldArray, item._id])
            })

            Promise.all(result1).then(async action => {
                const result = await getStudentsAsMultipleCourse({ array })
                setStudent(result.data)
            }).catch(err => {
                alert(err)
            })

            // if (result1) {
            //     const result = await getStudentsAsMultipleCourse({ array })
            //     setStudent(result.data)
            // }



            //     allCourse.data.map(async item => {
            //         const studendlist = await getStudentsAsPerCourse(Number(item._id));
            //         setStudent( ...student, studendlist.data)
            //         console.log(studendlist.data)
            // })

        }
        setLoading(false)
    }


    return (
        <div className="px-3">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row' >
                            <div className='col-4'>
                                <h1 className="h4 mb-4">Student Management</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search user"
                                        style={{ borderRadius: '0' }}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-dark" type="button" style={{ borderRadius: '0' }}>
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: '0' }}>

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '30%' }} className='pl-4'>Name</th>
                                        <th scope="col" className="text-center">Email</th>
                                        <th scope="col" className="text-center">Courses Enrolled</th>
                                        <th scope="col" className="text-center">Actions</th>
                                        {/* <th scope="col" className="text-center"> </th> */}
                                    </tr>
                                </thead>
                                <tbody className="p-2">
                                    {
                                        loading ?
                                            <>
                                                <tr>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            student ?
                                                student.filter(value => {
                                                    if (search === '') {
                                                        return value
                                                    }
                                                    else if (value.Name.toLowerCase().includes(search.toLowerCase())) {
                                                        return value
                                                    }
                                                })
                                                    .map((item) => (
                                                        <>
                                                            <tr key={item._id}>
                                                                <td className='align-middle '>
                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/instructor/users/" + (item._id)} style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span className='text-dark' style={{ fontSize: '14px' }}>{item.Name}</span>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span className="ml-3" style={{ fontSize: '14px' }}>{item.Email}</span>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span className="ml-3" style={{ fontSize: '14px' }}>{student ? item.Courses.length : 0}</span>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <Link to={"/dashboard/instructor/users/" + (item._id)} className="btn btn-dark" style={{ borderRadius: '0' }}>View</Link>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    ))

                                                :

                                                <tr>
                                                    <td className="text-center text-dark" colspan="5">No Record Found</td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </div>
    )
}

export default Students
