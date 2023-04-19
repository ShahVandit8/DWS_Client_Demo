import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFilesByCourse, getCoursesByID, deleteFile } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const ManageResources = () => {

    useEffect(() => {
        getFilesData();
        getCourseDetails();
    }, [])

    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([])
    const [filescount, setFilesCount] = useState(0)
    const [course, setCourse] = useState({})
    const [search, setSearch] = useState('')

    const getFilesData = async () => {
        setLoading(true)
        const files = await getFilesByCourse(id)
        if (files.data.data) {
            setFiles(files.data.data)
            setFilesCount(files.data.data.length)
        }
        setLoading(false)
    }

    const getCourseDetails = async () => {
        const list = await getCoursesByID(id);
        setCourse(list.data)
    }

    const openFilePreview = (e) => {
        window.open(process.env.REACT_APP_SERVER_FILES + e)
    }

    const onDelete = async (e) => {
        if (window.confirm('Are you sure you want to delete')) {

            try {
                const result = await deleteFile(e)

                if (result.data.status === 200) {
                    toast('✅ File Deleted Successfully')
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error('Error: File not deleted')
                }
            }
            catch (err) {
                toast.error('Error:' + err)
            }

        }
    }

    const PageReload = () => {
        navigate(0)
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
                                <h1 className="h4 mb-4">Manage Resources</h1>
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

                        <div className="row">
                            <div className="col-8">
                                <div className="card" style={{ borderRadius: '0' }}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '80%' }} className='pl-4'>Files</th>
                                                <th className='text-right pr-5'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                        </tr>
                                                    </>
                                                    :
                                                    files.length ?
                                                        files.filter(value => {
                                                            if (search === '') {
                                                                return value
                                                            }
                                                            else if (value.File.toLowerCase().includes(search.toLowerCase())) {
                                                                return value
                                                            }
                                                        })
                                                            .map(file => (
                                                                <tr>
                                                                    <td className='align-middle'>
                                                                        <Link className="d-flex align-items-center text-decoration-none mx-1" style={{ textDecoration: "none" }}>
                                                                            <button style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', color: '#754FFE', backgroundColor: '#D5D6D8' }} >
                                                                                {
                                                                                    file.File_type == 'docx' || file.File_type == 'doc' || file.File_type == 'txt' ?
                                                                                        <span className='bi bi-file-earmark-word-fill' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                        :
                                                                                        file.File_type == 'pdf' ?
                                                                                            <span className='bi bi-file-earmark-pdf-fill' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                            :
                                                                                            file.File_type == 'jpg' || file.File_type == 'jpeg' || file.File_type == 'png' ?
                                                                                                // <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILES + file.File} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                                                <span className='bi bi-file-earmark-image' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                                :
                                                                                                <span className='bi bi-file-earmark-fill' style={{ color: '#754FFE', fontSize: '20px' }}></span>
                                                                                }
                                                                            </button>
                                                                            <div className="pl-3 m-0">
                                                                                {/* <a href={'/file-preview/'+file.File}>{file.File.substring(file.File.indexOf('_') + 1)}</a> */}
                                                                                <a target="_blank" onClick={(e) => openFilePreview(file.File)} rel="noreferrer" >{file.File.substring(file.File.indexOf('_') + 1)}</a>
                                                                            </div>
                                                                        </Link>

                                                                    </td>
                                                                    <td className='align-middle'>
                                                                        <div className='text-center'>
                                                                            <button onClick={(e) => onDelete(file._id)} className="bi bi-trash"></button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        :
                                                        <tr>
                                                            <td colSpan='2' className='align-middle text-center'>
                                                                <span>No File Found</span>
                                                            </td>
                                                        </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-4">

                                <div className="card">
                                    <div className="card-header row m-0 py-3 bg-white" style={{}}>
                                        <div className="col-12 col-md-8 p-0">
                                            <span className="align-middle">Course</span>
                                        </div>
                                        <div className="col-12 col-md-4 p-0">
                                            <Link to={"/dashboard/instructor/courses/manage/" + course._id} style={{ borderRadius: '0' }} className='btn btn-sm btn-outline-dark float-center float-md-right '>Manage</Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <a className="d-flex align-items-center text-decoration-none mx-1" href={`/course/` + (course._id)} target="_blank" style={{ textDecoration: "none" }}>
                                                <img className="img-fluid rounded" src={process.env.REACT_APP_SERVER_FILE + course.CoverImage} alt="" style={{ height: '3rem' }} />
                                                <div className="pl-3 m-0">
                                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B' }}>{course.Name}</span>
                                                    <p className="text-body my-auto" style={{ fontSize: '13px' }}>• {course.Category}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <Link style={{ color: 'inherit' }} className="col-xl-3 col-sm-6 col-12  mb-2">
                                    <div className="card shadow" style={{ border: '0' }}>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="media d-flex">
                                                    <div className="media-body text-left">
                                                        <h4 className="">{
                                                            loading ?
                                                                <div className="loading">
                                                                    <div className="bar"></div>
                                                                </div>
                                                                :
                                                                filescount}</h4>
                                                        <span>Total Files</span>
                                                    </div>
                                                    <div className="align-self-center">
                                                        <i className="bi bi-file-earmark-check  fa-2x font-large-2 float-right" style={{ color: '#754FFE' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className='text-center'>
                                    <Link to={'/dashboard/instructor/resources/add/' + course._id} className="btn btn-dark" style={{ borderRadius: '0' }}>Add New File +</Link>
                                </div>
                            </div>
                        </div>
                    </>
            }

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

export default ManageResources
