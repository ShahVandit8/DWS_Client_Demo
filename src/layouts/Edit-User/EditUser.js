import { React, useState, useEffect } from 'react';
import { NavHashLink } from 'react-router-hash-link'
import jwtDecode from 'jwt-decode';
import Sidebar from '../../components/Edit-User/Sidebar';
import { Routes, Route, Outlet } from 'react-router-dom'

import EditUserProfile from '../../views/EditUser/EditUserProfile';
import EditPhoto from '../../views/EditUser/EditPhoto';

function EditUser() {

    // useEffect(() => {
    //     const token = sessionStorage.getItem('UserToken')
    //     if (token) {
    //         const user = jwtDecode(token)
    //         if (!user) {
    //             sessionStorage.removeItem('UserToken')
    //         }
    //         else {
    //             const userDetails = sessionStorage.getItem('User');
    //             setUser(JSON.parse(userDetails))
    //         }
    //     }
    // }, [])

    // const [user, setUser] = useState({});

    return (
        <section id="edit-user" className="edit-user">

            <div className="container">
                <div className="row justify-content-center">

                    <Sidebar />

                    <div className="col-lg-8 col-12 card2 p-0">

                        <Outlet />

                    </div>

                </div>
            </div>
        </section>
    )
}

export default EditUser
