import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link'
import jwtDecode from 'jwt-decode';
import Topbar from '../../components/Edit-User/Topbar.js'
import { edituserphoto } from '../../services/api.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPhoto() {

    useEffect(() => {
        const token = sessionStorage.getItem('UserToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('UserToken')
            }
            else {
                const userDetails = sessionStorage.getItem('User');
                setUser(JSON.parse(userDetails))
                const userDets = JSON.parse(userDetails)
                const profilepic = userDets.ProfilePicture
                setImage(process.env.REACT_APP_SERVER_FILE + profilepic)
            }
        }
        else {
            navigate('/')
        }
    }, [])

    const [user, setUser] = useState({});
    const navigate = useNavigate()

    const [image, setImage] = useState('')
    const [imagename, setImageName] = useState('No File Selected')

    const open_file = () => {
        document.getElementById('input_file').click();
    }

    const imageUpload = (e) => {
        setUser({ ...user, ProfilePicture: e.target.files[0] })
        setImage((URL.createObjectURL(e.target.files[0])))
        setImageName(e.target.files[0].name)
    }

    const editUserPhoto = async (e) => {
        e.preventDefault()

        if (user.ProfilePicture instanceof File) {
            try {
                const formdata = new FormData();
                formdata.append('ProfilePicture', user.ProfilePicture, user.ProfilePicture.name);
                const useredit = await edituserphoto(user._id, formdata)

                const UserToken = useredit.data;
                const userdetails = UserToken.user;
                console.log(UserToken.usertoken)

                if (useredit) {
                    if (UserToken.usertoken) {
                        sessionStorage.setItem('UserToken', UserToken.usertoken)
                        sessionStorage.setItem('User', JSON.stringify(userdetails))
                        console.log(UserToken);
                        toast("✅ Changes have been saved successfully");
                        window.setTimeout(PageReload, 3000)
                    }
                    else {
                        toast.error("Error: Changes not saved");
                    }
                }
                else {
                    toast.error("Something went wrong");
                }

            }
            catch (err) {
                toast.error("Something went wrong");
            }
        }
        else {
            alert('Please select any image')
        }
    }

    const PageReload = () => {
        navigate(0)
    }

    return (
        <>
            <Topbar Title="Photo" Description="Add a nice photo of yourself for your profile." />

            <div className='card3'>
                <div className="container">
                    <form className="card-body card-form" onSubmit={editUserPhoto}>
                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Image Preview</span>
                        <div className="image-tab">
                            <div className="image-bg">
                                <div className="image-main">
                                    {image.length ?
                                        <img src={image} className='mx-auto d-block' alt="" />
                                        :
                                        <div className="spinner-border mx-auto my-auto" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    }
                                    {/* <img src={image} className='mx-auto d-block' alt="" /> */}
                                </div>
                            </div>
                        </div>

                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>Add/Change Image</span>
                        <div className="image-upload d-flex">
                            <input type="file" name="" id='input_file' onChange={imageUpload} hidden />
                            <div className="col-9 m-0" style={{ backgroundColor: '#F7F9FA', height: '100%', padding: '10px' }}>
                                <span>{imagename}</span>
                            </div>
                            <div className="col-3 m-0 p-0">
                                <button onClick={open_file} type="button" className='upload-button'>Upload Image</button>
                            </div>
                        </div>
                        <button className="submitbutton" type='submit'>Save</button>
                    </form>
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
        </>
    )
}

export default EditPhoto
