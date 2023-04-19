import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addFile } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddResources = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [file, setFile] = useState('')
    const [fileext, setFileext] = useState('')
    const [filepreview, setFilepreview] = useState('')
    const [filename, setFileName] = useState('No File Selected')

    const open_file = () => {
        document.getElementById('input_file').click();
    }

    const imageUpload = (e) => {

        if (e.target.files[0]) {

            if (e.target.files[0].size > 104857600) {
                alert("File size exceedes the maximum limit!");
            }
            else {
                const fname = e.target.files[0].name

                const extension = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);

                if (extension === 'docx' || extension === 'doc' || extension === 'txt') {
                    setFilepreview('/img/word.png')
                    setFileName(e.target.files[0].name)
                    setFile(e.target.files[0])
                    setFileext(extension)
                }
                else if (extension === 'pdf') {
                    setFilepreview('/img/pdf.png')
                    setFileName(e.target.files[0].name)
                    setFile(e.target.files[0])
                    setFileext(extension)
                }
                else {
                    setFilepreview((URL.createObjectURL(e.target.files[0])))
                    setFileName(e.target.files[0].name)
                    setFile(e.target.files[0])
                    setFileext(extension)
                }

            }


        }

    }

    const uploadFile = async (e) => {
        e.preventDefault()

        if (file instanceof File) {
            try {
                const formdata = new FormData();
                formdata.append('Course_id', id);
                formdata.append('File', file, file.name);
                formdata.append('File_type', fileext);

                const upload = await addFile(formdata)

                if (upload.data.status == 200) {
                    toast('✅ File Uploaded Successfully')
                    window.setTimeout(PageBack, 3000)
                }
                else if (upload.data.status == 401 || upload.data.status == 402) {
                    toast.error('Error: File not uploaded')
                }
            }
            catch (err) {
                toast.error('Sorry Something went wrong')
            }
        }
        else {
            toast.warning('Please select a file to upload')
        }



    }

    const PageBack = () => {
        navigate(-1)
    }

    return (
        <div className="px-3">
            <div className='row' >
                <div className='col-6'>
                    <h1 className="h4 mb-4">Add Resources</h1>
                </div>
                <div className='col-6 text-right pr-5'>
                    <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                </div>
            </div>
            <form onSubmit={uploadFile} className="row">
                <div className="col-8 mx-auto">
                    <div className="card p-3" style={{ borderRadius: '0' }}>
                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>File</span>
                        <div className="image-tab">
                            <div className="image-bg">
                                <div className="image-main">
                                    <img src={filepreview} className='mx-auto d-block' alt="" />
                                    {/* <img src={image} className='mx-auto d-block' alt="" /> */}
                                </div>
                            </div>
                        </div>

                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>Add File</span>
                        <div className="image-upload d-flex">
                            <input type="file" name="" id='input_file' onChange={imageUpload} hidden accept="image/*, .pdf, .docx, .doc" />
                            <div className="col-9 m-0" style={{ backgroundColor: '#F7F9FA', height: '100%', padding: '10px' }}>
                                <span>{filename}</span>
                            </div>
                            <div className="col-3 m-0 p-0">
                                <button onClick={open_file} type="button" className='upload-button'>Upload File</button>
                            </div>
                        </div>
                        <div className="mt-1">
                            <span style={{ fontSize: '14px'}}>
                                <strong style={{color: 'red'}}>Note :</strong>
                                &nbsp; Maximum File size allowed is 100 mb.
                            </span>
                        </div>
                        <button type="submit" className="btn btn-dark mt-4" style={{ borderRadius: '0' }}>
                            Add File Resourse
                        </button>
                    </div>
                </div>
            </form>
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

export default AddResources
