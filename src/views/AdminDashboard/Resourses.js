import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCourses, getAllFiles } from '../../services/api';
import Loading from '../../layouts/LoadingScreen/Loading';

const Resourses = () => {

    useEffect(() => {
        getallcourses();
        getFiles();
    }, [])

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [course, setCourse] = useState([]);
    const [files, setFiles] = useState([])

    const getallcourses = async () => {
        setLoading(true)
        const result = await getCourses();
        setCourse(result.data);
    }

    const getFiles = async () => {
        const result = await getAllFiles();
        if (result.data.data) {
            setFiles(result.data.data)
        }
        setLoading(false);
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
                                <h1 className="h4 mb-4">Resources Management</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search course"
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
                                        <th scope="col" style={{ width: '30%' }} className='pl-4'>Course</th>
                                        {/* <th scope="col" className="text-center">Instructor</th> */}
                                        <th scope="col" className="text-center">Files Uploaded</th>
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
                                            course.length ?
                                                course.filter(value => {
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
                                                                    <a className="d-flex align-items-center text-decoration-none mx-1" href={`/course/` + (item._id)} target="_blank" style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + item.CoverImage} alt="" style={{ height: '3rem' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B' }}>{item.Name}</span>
                                                                            <p className="text-body my-auto" style={{ fontSize: '13px' }}>• {item.Category}</p>
                                                                        </div>
                                                                    </a>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span>
                                                                        {
                                                                            files.filter((item1) => item1.Course_id == item._id).length
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <Link to={`course/` + (item._id)} className="btn btn-dark" style={{ borderRadius: '0' }}>Manage</Link>                                     
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

export default Resourses
