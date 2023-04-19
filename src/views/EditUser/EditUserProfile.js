import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link'
import jwtDecode from 'jwt-decode';
import Topbar from '../../components/Edit-User/Topbar.js'
import { edituserbasicdetails } from '../../services/api.js'
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditUserProfile() {

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
            }
        }
        else {
            navigate('/authentication/sign-in')
        }
    }, [])

    const [user, setUser] = useState({});
    const navigate = useNavigate()

    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    const editUserProfile = async (e) => {
        e.preventDefault();

        try {
            const useredit = await edituserbasicdetails(user._id, user)

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

    const PageReload = () => {
        navigate(0)
    }

    return (
        <>
            <Topbar Title="User Profile" Description="Add information about yourself" />

            <div className='card3'>
                <div className="container">
                    <form className="card-body card-form" onSubmit={editUserProfile}>
                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Basics:</span>
                        <input type="text" name="Name" className="form-control" placeholder="Name" value={user.Name} required onChange={(e) => onValueChange(e)} />
                        <input type="text" pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" name="Email" className="form-control" placeholder="Email" value={user.Email} required onChange={(e) => onValueChange(e)} />
                        <select name="Gender" className="form-control" id="Gender" value={user.Gender} onChange={(e) => onValueChange(e)}>
                            <option value="select" selected>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="date" name="DOB" value={moment(user.DOB).format('yyyy-MM-DD')} className="form-control" onChange={(e) => onValueChange(e)} />
                        <input type="text" name="Contact" className="form-control" placeholder="Contact No (+91)" value={user.Contact ? user.Contact : ''} onChange={(e) => onValueChange(e)} />
                        <textarea className="form-control" name="Address" rows='4' value={user.Address} placeholder="Address" onChange={(e) => onValueChange(e)}></textarea>
                        <button className="submitbutton">Save</button>
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

export default EditUserProfile
