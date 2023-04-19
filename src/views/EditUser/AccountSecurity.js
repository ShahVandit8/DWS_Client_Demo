import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link'
import jwtDecode from 'jwt-decode';
import Topbar from '../../components/Edit-User/Topbar.js'
import { edituserpassword } from '../../services/api.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AccountSecurity() {

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

    const defaultValue1 = {
        oldpass: "",
        newpass: ""
    }

    const [user, setUser] = useState({});
    const navigate = useNavigate()
    const [password, setPassword] = useState(defaultValue1);

    const onValueChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
        console.log(password)
    }

    const UpdateUserPassword = async (e) => {
        e.preventDefault()

        const npass = document.getElementById('newpass');
        const cpass = document.getElementById('confirmpass');

        if(cpass.value !== npass.value) {
            alert ('Confirm Password Doesnt match with New Password')
        }
        else {

            try{
                const passupdated = await edituserpassword(user._id, password);

                const UserToken = passupdated.data;
                const userdetails = UserToken.user;
                console.log(UserToken.usertoken)

                if (passupdated) {
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
            catch(err) {
                toast.error("Wrong Current Credentials");
            }
        }
    }

    const PageReload = () => {
        navigate(0)
    }

  return (
    <>
            <Topbar Title="Account" Description="Edit your account settings and change your password here." />

            <div className='card3'>
                <div className="container">
                    <form className="card-body card-form" onSubmit={UpdateUserPassword}>
                        <span style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Password:</span>
                        <input type="text" name="oldpass" className="form-control" placeholder="Enter Current Password" onChange={(e) => onValueChange(e)} required />
                        <input type="text" name="newpass" id="newpass" className="form-control" placeholder="Enter New Password" onChange={(e) => onValueChange(e)} required pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" />
                        <input type="text" className="form-control" id='confirmpass' name='confirmpass' placeholder="Re-type New Password" required />
                        <button className="submitbutton" type="submit">Change password</button>
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

export default AccountSecurity
