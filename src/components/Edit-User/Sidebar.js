import { React, useState, useEffect } from 'react';
import { NavHashLink } from 'react-router-hash-link'
import jwtDecode from 'jwt-decode';

function Sidebar() {

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
    }, [])

    const [user, setUser] = useState({});

    return (
        <div className="col-lg-2 col-12 card1 border-md-0 p-0">
            <div className="card-body p-0">
                <div className="p-4">
                    <img src={process.env.REACT_APP_SERVER_FILE + user.ProfilePicture} className='profile-img d-block mx-auto' alt="" />
                    <h2 className="text-center mt-3">{user.Name}</h2>
                </div>
                <div className="sidebar-nav">
                    <ul>
                        <NavHashLink className="nav-link" to="edit-profile"><li>Profile</li></NavHashLink>
                        <NavHashLink className="nav-link" to="edit-photo"><li>Photo</li></NavHashLink>
                        <NavHashLink className="nav-link" to="edit-account"><li>Account Security</li></NavHashLink>
                        <NavHashLink className="nav-link" to="close-account"><li>Close account</li></NavHashLink>
                        {/* <li>Close account</li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
