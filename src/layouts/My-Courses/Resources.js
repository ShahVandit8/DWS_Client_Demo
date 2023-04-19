import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/Edit-User/Topbar'
import { getFilesByCourse, getCoursesByID, deleteFile } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resources = () => {

    useEffect(() => {
        getFilesData();
    }, [])

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState([])

    const getFilesData = async () => {
        setLoading(true)
        const files = await getFilesByCourse(id)
        if (files.data.data) {
            setFiles(files.data.data)
        }
        setLoading(false)
    }

    const openFilePreview = (e) => {
        window.open(process.env.REACT_APP_SERVER_FILES + e)
    }


    return (
        <div>
            <Topbar Title="Resources" Description="All Files and Resources uploaded by the instructor" />

            <div className="card3">
                <div className="container">

                    <div className="card mt-3" style={{ borderRadius: '0' }}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>File</th>
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
                                            </tr>
                                        </>
                                        :
                                        files.length ?
                                            files.map(file => (
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
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan='2' className='align-middle text-center'>
                                                    <span>No File available</span>
                                                </td>
                                            </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Resources
